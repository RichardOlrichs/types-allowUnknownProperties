<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [ArrayType](./types.arraytype.md)

## ArrayType class

The implementation behind types created with [array()](./types.array.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare class ArrayType<ElementType extends BaseTypeImpl<Element>, Element, ResultType extends Element[]> extends BaseTypeImpl<ResultType>
```

<b>Extends:</b> [BaseTypeImpl](./types.basetypeimpl.md)<!-- -->&lt;ResultType&gt;

## Constructors

| Constructor                                                            | Modifiers | Description                                                   |
| ---------------------------------------------------------------------- | --------- | ------------------------------------------------------------- |
| [(constructor)(elementType, name)](./types.arraytype._constructor_.md) |           | Constructs a new instance of the <code>ArrayType</code> class |

## Properties

| Property                                        | Modifiers | Type        | Description |
| ----------------------------------------------- | --------- | ----------- | ----------- |
| [basicType](./types.arraytype.basictype.md)     |           | 'array'     |             |
| [elementType](./types.arraytype.elementtype.md) |           | ElementType |             |
| [name](./types.arraytype.name.md)               |           | string      |             |

## Methods

| Method                                                              | Modifiers | Description |
| ------------------------------------------------------------------- | --------- | ----------- |
| [typeValidator(input, options)](./types.arraytype.typevalidator.md) |           |             |