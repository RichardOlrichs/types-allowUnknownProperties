<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [LiteralType](./types.literaltype.md)

## LiteralType class

The implementation behind types created with [literal()](./types.literal.md) and [nullType](./types.nulltype.md)<!-- -->, [undefinedType](./types.undefinedtype.md) and [voidType](./types.voidtype.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare class LiteralType<ResultType extends LiteralValue> extends BaseTypeImpl<ResultType>
```

<b>Extends:</b> [BaseTypeImpl](./types.basetypeimpl.md)<!-- -->&lt;ResultType&gt;

## Constructors

| Constructor                                                  | Modifiers | Description                                                     |
| ------------------------------------------------------------ | --------- | --------------------------------------------------------------- |
| [(constructor)(value)](./types.literaltype._constructor_.md) |           | Constructs a new instance of the <code>LiteralType</code> class |

## Properties

| Property                                                                  | Modifiers | Type                              | Description |
| ------------------------------------------------------------------------- | --------- | --------------------------------- | ----------- |
| [basicType](./types.literaltype.basictype.md)                             |           | [BasicType](./types.basictype.md) |             |
| [enumerableLiteralDomain](./types.literaltype.enumerableliteraldomain.md) |           | ResultType\[\]                    |             |
| [name](./types.literaltype.name.md)                                       |           | string                            |             |
| [value](./types.literaltype.value.md)                                     |           | ResultType                        |             |

## Methods

| Method                                                       | Modifiers | Description |
| ------------------------------------------------------------ | --------- | ----------- |
| [autoCaster(input)](./types.literaltype.autocaster.md)       |           |             |
| [typeValidator(value)](./types.literaltype.typevalidator.md) |           |             |