import { BaseTypeImpl, createType } from '../base-type.js';
import type { BasicType, LiteralValue, Result, TypeImpl, Visitor } from '../interfaces.js';
import { autoCastFailure } from '../symbols.js';
import { basicType, define, printValue } from '../utils/index.js';
import { booleanAutoCaster } from './boolean.js';
import { numberAutoCaster } from './number.js';

/**
 * The implementation behind types created with {@link literal} and {@link nullType}, {@link undefinedType} and {@link voidType}.
 */
export class LiteralType<ResultType extends LiteralValue> extends BaseTypeImpl<ResultType> {
    readonly name: string;
    readonly typeConfig: undefined;

    constructor(readonly value: ResultType) {
        super();
        this.name = printValue(value);
    }

    readonly basicType: BasicType = basicType(this.value);
    override readonly enumerableLiteralDomain = [this.value];

    protected typeValidator(input: unknown): Result<ResultType> {
        return this.createResult(
            input,
            input,
            input === this.value ||
                (basicType(input) !== this.basicType
                    ? { kind: 'invalid basic type', expected: this.basicType, expectedValue: this.value }
                    : { kind: 'invalid literal', expected: this.value }),
        );
    }

    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitLiteralType(this);
    }
}

// Defined outside class definition, because TypeScript somehow ends up in a wild-typings-goose-chase that takes
// up to a minute or more. We have to make sure consuming libs don't have to pay this penalty ever.
define(LiteralType, 'autoCaster', function (this: LiteralType<LiteralValue>, input: unknown) {
    switch (this.basicType) {
        case 'string':
            return String(input);
        case 'number':
            return numberAutoCaster(input);
        case 'boolean':
            return booleanAutoCaster(input);
        case 'null':
        case 'undefined':
            return input == null ? this.value : autoCastFailure;
        // istanbul ignore next: not possible
        default:
            return autoCastFailure;
    }
});

export function literal<T extends LiteralValue>(value: T): TypeImpl<LiteralType<T>> {
    return createType(new LiteralType(value));
}

export const nullType: TypeImpl<LiteralType<null>> = literal(null);
export const undefinedType: TypeImpl<LiteralType<undefined>> = literal(undefined);
export const voidType: TypeImpl<LiteralType<void>> = undefinedType;
