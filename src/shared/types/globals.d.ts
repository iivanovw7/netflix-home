/**
 * Module contains global application types.
 * @module shared/types/global
 */
import type { FC, ComponentType, PropsWithChildren, ReactElement, Key } from 'react';
import type { ValidateOptions } from 'yup/lib/types';

/*
    eslint-disable
    @typescript-eslint/ban-types,
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/prefer-function-type
*/

declare global {

    namespace JSX {}

    type JSX = {};

    type ReactFC<T = {}, R extends 'nullable' = null> = {
        (props: T): R extends 'nullable' ? Nullable<ReactElement<any, any>> : ReactElement<any, any>;
    };

    type Pixels = number;

    /** Represents type of optional object. */
    type Maybe<T> = T | undefined | null;

    /** Represents type of `nullable` object. */
    type Nullable<T> = T | null;

    type ErrorMessage = string;

    type Voidable<T> = T | void | undefined;

    type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer Data> ? Data : never;

    /** Represents any function. */
    type AnyFunction = (...args: unknown[]) => unknown;

    type AsyncReturnType<T extends (...args: any[]) => Promise<any>> = UnwrapPromise<ReturnType<T>>;

    type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    type Constructor<T = any> = new (...args: any[]) => T;

    type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

    /** Represents any object object. */
    interface AnyObject<T = any> {
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

    type AnyComponent = ComponentType<PropsWithChildren<any>>;

    type ExtractType<T, U extends T> = T extends U ? T : never;

    type HFC = <Props extends object>(Component: FC<Props>) => FC<Props>;

    type FieldValidationResult = Maybe<ErrorMessage>;

    type Validate<T = any> = (value?: T, options?: ValidateOptions<any>) => FieldValidationResult;

    type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

    type DotNestedKeys<T> = (
        T extends object
            ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
            : ''
    ) extends infer D ? Extract<D, string> : never;

    type FalsyJSX = false | null | undefined | '' | 0;

    type MappableItems<T extends AnyObject> = ReadonlyArray<FalsyJSX | (T & { key?: Key })>;
}

/*
    eslint-enable
    @typescript-eslint/ban-types,
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/prefer-function-type
*/

