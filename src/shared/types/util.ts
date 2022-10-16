import type { Key } from 'react';

export type Size = 'small' | 'medium' | 'large';

export type Color = 'primary' | 'secondary' | 'danger';

export type Fill = 'full' | 'outline' | 'none';

// TODO: horizontal and vertical alignment
export type Alignment = 'left' | 'center' | 'right';

export type FalsyJSX = false | null | undefined | '' | 0;

export type MappableItems<T extends AnyObject> = ReadonlyArray<FalsyJSX | (T & { key?: Key })>;


