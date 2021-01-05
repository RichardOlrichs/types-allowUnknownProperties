<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [printKey](./types.printkey.md)

## printKey() function

Print a property-key in a JavaScript compatible way.

<b>Signature:</b>

```typescript
export declare function printKey(key: string): string;
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| key       | string |             |

<b>Returns:</b>

string

## Remarks

This means that if the the `key` is a valid identifier it will be returned as is, otherwise it will be quoted.