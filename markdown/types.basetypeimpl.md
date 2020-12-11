<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [BaseTypeImpl](./types.basetypeimpl.md)

## BaseTypeImpl class

The base-class of all type-implementations.

<b>Signature:</b>

```typescript
export declare abstract class BaseTypeImpl<ResultType> implements TypeLink<ResultType>
```

<b>Implements:</b> [TypeLink](./types.typelink.md)<!-- -->&lt;ResultType&gt;

## Remarks

All type-implementations must extend this base class. Use [createType()](./types.createtype.md) to create a [Type](./types.type.md) from a type-implementation.

## Properties

| Property                                                                    | Modifiers | Type                                                            | Description                                                       |
| --------------------------------------------------------------------------- | --------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| [autoCast](./types.basetypeimpl.autocast.md)                                |           | this                                                            | The same type, but with an auto-casting default parser installed. |
| [basicType](./types.basetypeimpl.basictype.md)                              |           | [BasicType](./types.basictype.md) \| 'mixed'                    | The kind of values this type validates.                           |
| [enumerableLiteralDomain?](./types.basetypeimpl.enumerableliteraldomain.md) |           | Iterable&lt;[LiteralValue](./types.literalvalue.md)<!-- -->&gt; | <i>(Optional)</i> The set of valid literals if enumerable.        |
| [name](./types.basetypeimpl.name.md)                                        |           | string                                                          | The name of the Type.                                             |

## Methods

| Method                                                                               | Modifiers | Description                                                                                                                     |
| ------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [andThen(fn)](./types.basetypeimpl.andthen.md)                                       |           | Create a function with validated input.                                                                                         |
| [assert(input)](./types.basetypeimpl.assert.md)                                      |           | Verifies that a value conforms to this Type.                                                                                    |
| [autoCaster(value)](./types.basetypeimpl.autocaster.md)                              |           | The logic that is used in the autocasting version of the current type.                                                          |
| [check(input)](./types.basetypeimpl.check.md)                                        |           | Asserts that a value conforms to this Type and returns the input as is if it does.                                              |
| [construct(input)](./types.basetypeimpl.construct.md)                                |           | Calls any registered parsers or auto-caster, verifies that the resulting value conforms to this Type and returns it if it does. |
| [createAutoCastType()](./types.basetypeimpl.createautocasttype.md)                   |           | Create a autocasting version of the current type using [BaseTypeImpl.autoCaster()](./types.basetypeimpl.autocaster.md)<!-- -->. |
| [createResult(input, result, validatorResult)](./types.basetypeimpl.createresult.md) |           | Create a Result based on the given [ValidationResult](./types.validationresult.md)<!-- -->.                                     |
| [extendWith(factory)](./types.basetypeimpl.extendwith.md)                            |           | Extend the Type with additional static methods and properties.                                                                  |
| [is(input)](./types.basetypeimpl.is.md)                                              |           | A type guard for this Type.                                                                                                     |
| [or(\_other)](./types.basetypeimpl.or.md)                                            |           | Union this Type with another Type.                                                                                              |
| [typeParser(input, options)?](./types.basetypeimpl.typeparser.md)                    |           | <i>(Optional)</i> Optional pre-processing parser.                                                                               |
| [typeValidator(input, options)](./types.basetypeimpl.typevalidator.md)               |           | The actual validation-logic.                                                                                                    |
| [validate(input, options)](./types.basetypeimpl.validate.md)                         |           | Validates that a value conforms to this type, and returns a result indicating success or failure (does not throw).              |
| [withBrand(name)](./types.basetypeimpl.withbrand.md)                                 |           | Create a new instance of this Type with the given name.                                                                         |
| [withConstraint(name, constraint)](./types.basetypeimpl.withconstraint.md)           |           | Create a new type use the given constraint function to restrict the current type.                                               |
| [withName(name)](./types.basetypeimpl.withname.md)                                   |           | Create a new instance of this Type with the given name.                                                                         |
| [withParser(args)](./types.basetypeimpl.withparser.md)                               |           | Define a new type with the same specs, but with the given parser and an optional new name.                                      |
| [withValidation(validation)](./types.basetypeimpl.withvalidation.md)                 |           | Clone the type with the added validation.                                                                                       |