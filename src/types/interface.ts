import { BaseObjectLikeTypeImpl, BaseTypeImpl, createType, TypedPropertyInformation } from '../base-type.js';
import type {
    LiteralValue,
    MergeIntersection,
    MessageDetails,
    ObjectType,
    Properties,
    PropertiesInfo,
    Result,
    Type,
    TypeImpl,
    TypeOfProperties,
    ValidationOptions,
    Visitor,
    Writable,
} from '../interfaces.js';
import {
    decodeOptionalName,
    decodeOptionalOptions,
    defaultObjectRep,
    define,
    extensionName,
    hasOwnProperty,
    prependPathToDetails,
} from '../utils/index.js';
import { unknownRecord } from './unknown.js';

/**
 * Options for {@link object}.
 */
export interface InterfaceTypeOptions {
    /** The optional name for the type, uses a default TypeScript-like name if no name is given. */
    name?: string;
    /** Mark all properties as optional in this type. */
    partial?: boolean;
    /** Discriminate between missing keys and undefined values. Is off by default because that is what TypeScript does. */
    strictMissingKeys?: boolean;
    /**
     * Force this type (including all nested property-types recursively) to be validated in 'check' mode.
     *
     * @remarks
     * The result of the validation (when successful) will be the original input.
     *
     * Note: Any autoCast or parser on nested types will have no effect in 'check' mode.
     */
    checkOnly?: boolean;
    /**
     * When constructing values, allow unknown properties to pass unvalidated into the constructed value.
     * Default value is true.
     */
    allowUnknownProperties?: boolean;
}

/**
 * The implementation behind types created with {@link object} and {@link partial}.
 */
export class InterfaceType<Props extends Properties, ResultType>
    extends BaseObjectLikeTypeImpl<ResultType>
    implements TypedPropertyInformation<Props>
{
    readonly name: string;
    readonly basicType!: 'object';
    readonly isDefaultName: boolean;
    readonly typeConfig: undefined;

    constructor(readonly props: Props, readonly options: InterfaceTypeOptions) {
        super();
        this.isDefaultName = !options.name;
        this.name = options.name || defaultObjectRep(this.propsInfo);
    }

    /** The keys (property-names) for this object-like type. */
    readonly keys = Object.keys(this.props) as Array<keyof Props>;
    readonly propsInfo = toPropsInfo(this.props, this.options.partial);
    readonly possibleDiscriminators = this.options.partial ? [] : getPossibleDiscriminators(this.props);

    protected typeValidator(input: unknown, options: ValidationOptions): Result<ResultType> {
        if (this.options.checkOnly) {
            // can copy here, because this is done after adding the 'visitedMap'
            options = { ...options, mode: 'check' };
        }
        if (!unknownRecord.is(input)) {
            return this.createResult(input, undefined, { kind: 'invalid basic type', expected: 'object' });
        }
        const { strictMissingKeys, partial, allowUnknownProperties } = this.options;
        const details: MessageDetails[] = [];
        const constructResult = {} as Record<string, unknown>;

        // Default is true, we check for explicit false
        if (allowUnknownProperties === false) {
            const typeKeys = new Set(Object.keys(this.props));
            // search for input properties not defined in the type
            for (const key of Object.keys(input)) {
                if (!typeKeys.has(key)) {
                    // If we are not in strictMode and the value is undefined, we do not throw an error.
                    if (input[key] === undefined && !strictMissingKeys) {
                        continue;
                    }
                    details.push(unknownProperty(key));
                }
            }
        }

        for (const [key, innerType] of Object.entries(this.props)) {
            const missingKey = !hasOwnProperty(input, key);
            if (partial) {
                if (missingKey || (!strictMissingKeys && input[key] === undefined)) {
                    continue;
                }
            } else if (missingKey && strictMissingKeys) {
                details.push(missingProperty(key, innerType));
                continue;
            }
            const innerResult = innerType.validate(input[key], options);
            if (innerResult.ok) {
                constructResult[key] = innerResult.value;
            } else if (missingKey) {
                details.push(missingProperty(key, innerType));
            } else {
                details.push(...prependPathToDetails(innerResult, key));
            }
        }
        return this.createResult(input, options.mode === 'construct' ? constructResult : input, details);
    }

    /** Clone this type with all properties marked optional. */
    toPartial(name = `Partial<${this.name}>`): PartialType<Props> {
        return createType(new InterfaceType(this.props, { ...this.options, partial: true, name }));
    }

    /** Create a type with all properties of the current type, plus the given optional properties. */
    withOptional<PartialProps extends Properties>(
        ...args: [props: PartialProps] | [name: string, props: PartialProps]
    ): TypeImpl<BaseObjectLikeTypeImpl<MergeIntersection<ResultType & Partial<TypeOfProperties<Writable<PartialProps>>>>>> &
        TypedPropertyInformation<Props & PartialProps> {
        const [name = this.isDefaultName ? undefined : this.name, props] = decodeOptionalName<[PartialProps]>(args);
        const newType = this.and(partial(props));
        return name ? newType.withName(name) : newType;
    }

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitObjectLikeType(this);
    }
}
define(InterfaceType, 'basicType', 'object');

// Defined outside class definition, because TypeScript somehow ends up in a wild-typings-goose-chase that takes
// up to a minute or more. We have to make sure consuming libs don't have to pay this penalty ever.
define(InterfaceType, 'createAutoCastAllType', function (this: InterfaceType<Properties, any>) {
    const name = extensionName(this, 'autoCastAll');
    const props: Properties = {};
    for (const [key, value] of Object.entries(this.props)) {
        props[key] = value.autoCastAll;
    }
    return createType(new InterfaceType(props, { ...this.options, name }).autoCast);
});

function missingProperty(property: string, type: BaseTypeImpl<unknown>): MessageDetails {
    return { kind: 'missing property', property, type };
}

function unknownProperty(property: string): MessageDetails {
    return { kind: 'unknown property', property };
}

export type FullType<Props extends Properties> = TypeImpl<InterfaceType<Props, TypeOfProperties<Writable<Props>>>>;

/**
 * Create a type-validator that validates (or parses) an object structure.
 *
 * @remarks
 * This is a basic building block for more complex structured types, can be nested.
 *
 * @param args - the options and properties of the new type
 */
export function object<Props extends Properties>(
    ...args: [props: Props] | [name: string, props: Props] | [options: InterfaceTypeOptions, props: Props]
): FullType<Props> {
    const [options, props] = decodeOptionalOptions<InterfaceTypeOptions, Props>(args);
    return createType(new InterfaceType(props, options));
}

export type PartialType<Props extends Properties> = TypeImpl<InterfaceType<Props, Partial<TypeOfProperties<Writable<Props>>>>>;

/**
 * Create a type-validator that validates (or parses) an object structure with only optional properties.
 *
 * @remarks
 * This is a basic building block for more complex structured types, can be nested.
 *
 * @param args - the optional name and (required) properties of the new type
 */
export function partial<Props extends Properties>(
    ...args: [props: Props] | [name: string, props: Props] | [options: Omit<InterfaceTypeOptions, 'partial'>, props: Props]
): PartialType<Props> {
    const [options, props] = decodeOptionalOptions<InterfaceTypeOptions, Props>(args);
    return createType(new InterfaceType(props, { ...options, partial: true }));
}

function toPropsInfo<Props extends Properties>(props: Props, partial = false): PropertiesInfo<Props> {
    const result = {} as PropertiesInfo;
    for (const [key, type] of Object.entries(props)) {
        result[key] = { partial, type };
    }
    return result as PropertiesInfo<Props>;
}

function getPossibleDiscriminators(
    props: Record<string, Type<unknown> | ObjectType<unknown>>,
): Array<{ path: string[]; values: LiteralValue[] }> {
    const result: BaseObjectLikeTypeImpl<unknown>['possibleDiscriminators'] = [];
    for (const [key, prop] of Object.entries(props)) {
        if ('possibleDiscriminators' in prop) {
            result.push(...prop.possibleDiscriminators.map(({ path, values }) => ({ path: [key, ...path], values })));
        } else if (prop.enumerableLiteralDomain) {
            result.push({ path: [key], values: [...prop.enumerableLiteralDomain] });
        }
    }
    return result;
}
