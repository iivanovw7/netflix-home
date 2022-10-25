/**
 * Module contains global application types.
 * @module shared/types/global
 */
import type { FC, ComponentType, PropsWithChildren, ReactElement, Key } from 'react';
import type { ValidateOptions } from 'yup/lib/types';

declare global {

    // eslint-disable-next-line @typescript-eslint/ban-types
    type JSX = {};

    // eslint-disable-next-line @typescript-eslint/ban-types
    type ReactFC<T = {}, R extends 'nullable' = null> = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/prefer-function-type
        (props: T): R extends 'nullable' ? Nullable<ReactElement<any, any>> : ReactElement<any, any>;
    };

    namespace JSX {}

    type Pixels = number;

    /** Represents type of optional object. */
    type Maybe<T> = T | undefined | null;

    /** Represents type of `nullable` object. */
    type Nullable<T> = T | null;

    type ErrorMessage = string;

    type Voidable<T> = T | void | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer Data> ? Data : never;

    /** Represents any function. */
    type AnyFunction = (...args: unknown[]) => unknown;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AsyncReturnType<T extends (...args: any[]) => Promise<any>> = UnwrapPromise<ReturnType<T>>;

    type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Constructor<T = any> = new (...args: any[]) => T;

    type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

    /** Represents any object object. */
    interface AnyObject<T = unknown> {
        [field: string]: T;
    }

    /** Gets property type. */
    type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

    /** Represents type of object with partial and `nullable` fields. */
    type PartialAndNullable<T> = {
        [P in keyof T]?: T[P] | null;
    };

    type ObjectOrNull<T = unknown> = Nullable<AnyObject<T>>;
    type OptionalObject<T = unknown> = Maybe<ObjectOrNull<T>>;

    /** Object containing promise. */
    interface WithPromise<T = unknown> {
        promise: Promise<T>;
    }

    type ValueOf<T> = T[keyof T];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AnyComponent = ComponentType<PropsWithChildren<any>>;

    type ExtractType<T, U extends T> = T extends U ? T : never;

    export type HFC = <Props extends object>(Component: FC<Props>) => FC<Props>;

    export type FieldValidationResult = Maybe<ErrorMessage>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type Validate<T = any> = (value?: T, options?: ValidateOptions<any>) => FieldValidationResult;

    export type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

    export type DotNestedKeys<T> = (
        T extends object
            ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
            : ''
    ) extends infer D ? Extract<D, string> : never;

    export type FalsyJSX = false | null | undefined | '' | 0;

    export type MappableItems<T extends AnyObject> = ReadonlyArray<FalsyJSX | (T & { key?: Key })>;
}
