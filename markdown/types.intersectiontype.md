<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [IntersectionType](./types.intersectiontype.md)

## IntersectionType class

The implementation behind types created with [intersection()](./types.intersection.md) and [BaseObjectLikeTypeImpl.and()](./types.baseobjectliketypeimpl.and.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare class IntersectionType<Types extends OneOrMore<BaseObjectLikeTypeImpl<unknown>>> extends BaseObjectLikeTypeImpl<IntersectionOfTypeTuple<Types>, undefined> implements TypedPropertyInformation<PropertiesOfTypeTuple<Types>>
```

<b>Extends:</b> [BaseObjectLikeTypeImpl](./types.baseobjectliketypeimpl.md)<!-- -->&lt;[IntersectionOfTypeTuple](./types.intersectionoftypetuple.md)<!-- -->&lt;Types&gt;, undefined&gt;

<b>Implements:</b> [TypedPropertyInformation](./types.typedpropertyinformation.md)<!-- -->&lt;[PropertiesOfTypeTuple](./types.propertiesoftypetuple.md)<!-- -->&lt;Types&gt;&gt;

## Constructors

| Constructor                                                             | Modifiers | Description                                                          |
| ----------------------------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| [(constructor)(types, name)](./types.intersectiontype._constructor_.md) |           | Constructs a new instance of the <code>IntersectionType</code> class |

## Properties

| Property                                                                     | Modifiers | Type                                                                                                                                      | Description |
| ---------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [basicType](./types.intersectiontype.basictype.md)                           |           | 'object'                                                                                                                                  |             |
| [combinedName](./types.intersectiontype.combinedname.md)                     |           | string                                                                                                                                    |             |
| [isDefaultName](./types.intersectiontype.isdefaultname.md)                   |           | boolean                                                                                                                                   |             |
| [name](./types.intersectiontype.name.md)                                     |           | string                                                                                                                                    |             |
| [possibleDiscriminators](./types.intersectiontype.possiblediscriminators.md) |           | Array&lt;{ path: string\[\]; values: [LiteralValue](./types.literalvalue.md)<!-- -->\[\]; }&gt;                                           |             |
| [props](./types.intersectiontype.props.md)                                   |           | [PropertiesOfTypeTuple](./types.propertiesoftypetuple.md)<!-- -->&lt;Types&gt;                                                            |             |
| [propsInfo](./types.intersectiontype.propsinfo.md)                           |           | [PropertiesInfo](./types.propertiesinfo.md)<!-- -->&lt;[PropertiesOfTypeTuple](./types.propertiesoftypetuple.md)<!-- -->&lt;Types&gt;&gt; |             |
| [typeConfig](./types.intersectiontype.typeconfig.md)                         |           | undefined                                                                                                                                 |             |
| [types](./types.intersectiontype.types.md)                                   |           | Types                                                                                                                                     |             |

## Methods

| Method                                                                     | Modifiers | Description |
| -------------------------------------------------------------------------- | --------- | ----------- |
| [accept(visitor)](./types.intersectiontype.accept.md)                      |           |             |
| [typeValidator(input, options)](./types.intersectiontype.typevalidator.md) |           |             |
