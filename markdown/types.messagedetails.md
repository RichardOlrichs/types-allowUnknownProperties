<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@skunkteam/types](./types.md) &gt; [MessageDetails](./types.messagedetails.md)

## MessageDetails type

Individual message details with optional info about the performed validation.

<b>Signature:</b>

```typescript
export declare type MessageDetails = Partial<ValidationDetails> & {
    path?: PropertyKey[];
    context?: string;
    omitInput?: boolean;
} & (
        | {
              kind?: undefined;
          }
        | {
              kind: 'missing property';
              property: string;
          }
        | {
              kind: 'invalid key';
              property: string;
              failure: Failure;
          }
        | {
              kind: 'invalid literal';
              expected: LiteralValue | LiteralValue[];
          }
        | {
              kind: 'invalid basic type';
              expected: BasicType | BasicType[];
              expectedValue?: LiteralValue;
          }
        | {
              kind: 'length out of range';
              violation: LengthViolation;
              config: LengthChecksConfig;
          }
        | {
              kind: 'input out of range';
              violation: NumberViolation;
              config: NumberTypeConfig;
          }
        | {
              kind: 'pattern mismatch';
              config: StringTypeConfig;
          }
        | {
              kind: 'union';
              failures: Failure[];
          }
        | {
              kind: 'custom message';
              message: string;
          }
    );
```

<b>References:</b> [ValidationDetails](./types.validationdetails.md)<!-- -->, [Failure](./types.failure.md)<!-- -->, [LiteralValue](./types.literalvalue.md)<!-- -->, [BasicType](./types.basictype.md)<!-- -->, [LengthViolation](./types.lengthviolation.md)<!-- -->, [LengthChecksConfig](./types.lengthchecksconfig.md)<!-- -->, [NumberViolation](./types.numberviolation.md)<!-- -->, [NumberTypeConfig](./types.numbertypeconfig.md)<!-- -->, [StringTypeConfig](./types.stringtypeconfig.md)
