/**
 * Module contains global application types.
 * @module shared/types/global
 */
import type { ComponentType, PropsWithChildren } from 'react';

declare global {

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IGlobalStore {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    type JSX = {};

    namespace JSX {}

    type Pixels = number;

    /** Represents type of optional object. */
    type Maybe<T> = T | undefined | null;

    /** Represents type of `nullable` object. */
    type Nullable<T> = T | null;

    /** Represents any function. */
    type AnyFunction = (...args: unknown[]) => unknown;

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
}
