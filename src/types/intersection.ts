import { BaseObjectLikeTypeImpl, createType } from '../base-type';
import type {
    MergeIntersection,
    OneOrMore,
    Properties,
    PropertiesInfo,
    Result,
    TypeImpl,
    TypeLink,
    TypeOf,
    ValidationOptions,
} from '../interfaces';
import { bracketsIfNeeded, decodeOptionalName, defaultObjectRep, getDetails, humanList, isFailure, isObject, partition } from '../utils';
import { UnionType } from './union';

export class IntersectionType<Types extends OneOrMore<BaseObjectLikeTypeImpl<unknown>>> extends BaseObjectLikeTypeImpl<
    IntersectionOfTypeTuple<Types>
> {
    readonly name: string;
    readonly basicType = 'object';
    readonly isDefaultName: boolean;

    constructor(readonly types: Types, name?: string) {
        super();
        this.isDefaultName = !name;
        this.name = name || defaultName(types);
        checkBasicTypes(types);
        checkOverlap(types);
    }

    // TODO: Smarter?
    readonly props = Object.assign({}, ...this.types.map(type => type.props)) as PropertiesOfTypeTuple<Types>;
    // TODO: Smarter?
    readonly propsInfo = Object.assign({}, ...this.types.map(type => type.propsInfo)) as PropertiesInfo<PropertiesOfTypeTuple<Types>>;
    readonly combinedName = combinedName(this.types);
    readonly possibleDiscriminators = this.types.flatMap(t => t.possibleDiscriminators);

    typeValidator(input: unknown, options: ValidationOptions): Result<IntersectionOfTypeTuple<Types>> {
        if (!isObject(input)) {
            return this.createResult(input, { type: this, value: input, kind: 'invalid basic type', expected: 'object' });
        }
        // Preventing circular problems is always relevant on object values...
        const [failures, successes] = partition(
            this.types.map(type => type.validate(input, options)),
            isFailure,
        );
        const details = failures.flatMap(getDetails);
        return this.createResult(
            !details.length && options.mode === 'construct'
                ? (Object.assign({}, ...successes.map(s => s.value)) as Record<string, unknown>)
                : input,
            details,
        );
    }
}

function checkBasicTypes(types: OneOrMore<BaseObjectLikeTypeImpl<unknown>>) {
    const nonObjectTypes = types.filter(t => t.basicType !== 'object');
    if (nonObjectTypes.length) {
        throw new Error(`can only create an intersection of objects, got: ${humanList(nonObjectTypes, 'and', t => t.name)}`);
    }
}

function checkOverlap(types: OneOrMore<BaseObjectLikeTypeImpl<unknown>>) {
    const keys = new Set<string>();
    const overlap = new Set<string>();
    for (const type of types) {
        for (const key of Object.keys(type.props)) {
            if (keys.has(key)) overlap.add(key);
            keys.add(key);
        }
    }
    if (overlap.size)
        console.warn(
            `overlapping properties are currently not supported in intersections, overlapping properties: ${humanList(
                [...overlap].sort(),
                'and',
            )}`,
        );
}

export function intersection<Types extends OneOrMore<BaseObjectLikeTypeImpl<unknown>>>(
    ...args: [name: string, types: Types] | [types: Types]
): TypeImpl<IntersectionType<Types>> {
    const [name, types] = decodeOptionalName(args);
    return createType(new IntersectionType(types, name));
}

function defaultName(types: BaseObjectLikeTypeImpl<unknown>[]): string {
    const [combinableTypes, restTypes] = partition(
        types,
        type => !(type instanceof UnionType) && type.basicType === 'object' && type.isDefaultName,
    );
    const names = restTypes.map(({ name }) => bracketsIfNeeded(name, '&'));
    if (combinableTypes.length) {
        // We can combine interfaces with default naming (no custom name)
        names.push(combinedName(combinableTypes));
    }
    return names.join(' & ');
}

function combinedName(types: BaseObjectLikeTypeImpl<unknown>[]) {
    const collectedProps: PropertiesInfo = {};
    for (const { propsInfo } of types) {
        for (const [key, prop] of Object.entries(propsInfo ?? {})) {
            if (!collectedProps[key] || (collectedProps[key]?.partial && !prop.partial)) {
                collectedProps[key] = prop;
            }
        }
    }
    return defaultObjectRep(collectedProps);
}

export type IntersectionOfTypeTuple<Tuple extends TypeLink<unknown>[]> = IntersectionOfTypeUnion<Tuple[number]>;
export type IntersectionOfTypeUnion<Union extends TypeLink<unknown>> = (
    // v--- always matches, but will distribute a union over the the first leg of the ternary expression
    Union extends unknown
        ? // v--- map the union to functions that accept the elements of the union (we are now a union of functions)
          (k: TypeOf<Union>) => void
        : never
) extends (k: infer Intersection) => void
    ? //  ^--- Then coerce the union of functions into a single function that implements all of them, that function must accept
      //       the intersection of all elements of the union
      // v--- Then (if possible) merge all properties into a single object for clarity
      MergeIntersection<Intersection>
    : never;

export type PropertiesOfTypeTuple<Tuple extends BaseObjectLikeTypeImpl<unknown>[]> = ObjectUnionToIntersection<Tuple[number]['props']> &
    Properties;

export type ObjectUnionToIntersection<Union> = (
    // v--- always matches, but will distribute a union over the the first leg of the ternary expression
    Union extends unknown
        ? // v--- map the union to functions that accept the elements of the union (we are now a union of functions)
          (k: Union) => void
        : never
) extends (k: infer Intersection) => void
    ? //  ^--- Then coerce the union of functions into a single function that implements all of them, that function must accept
      //       the intersection of all elements of the union
      // v--- Then (if possible) merge all properties into a single object for clarity
      MergeIntersection<Intersection>
    : never;

BaseObjectLikeTypeImpl.prototype.and = function <Other extends BaseObjectLikeTypeImpl<unknown>>(other: Other) {
    return intersection([this, other]);
};