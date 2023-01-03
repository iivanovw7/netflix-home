/**
 * Module contains BaseInput component.
 * @module ~/shared/components/Input/BaseInput
 */
import classNames from 'classnames';
import type {
    ForwardedRef,
    InputHTMLAttributes,
    FocusEventHandler,
    DetailedHTMLProps,
    ReactElement
} from 'react';
import React, { forwardRef } from 'react';

import type { Size } from '../../types';
import { bem } from '../../utils';

import './BaseInput.pcss';

export type InputBaseRef = ForwardedRef<HTMLInputElement>;
export type InputAttrs = InputHTMLAttributes<HTMLInputElement>;

type InputPropKeys = 'type'
| 'id'
| 'name'
| 'title'
| 'spellCheck'
| 'autoFocus'
| 'disabled'
| 'readOnly'
| 'placeholder'
| 'onChange'
| 'onFocus'
| 'onBlur'
| 'onKeyDown'
| 'onKeyUp'
| 'onKeyPress'
| 'onClick'
| 'className'
| 'maxLength';

export type BaseInputProps = Pick<InputAttrs, InputPropKeys> & {
    hasError?: boolean;
    selectOnFocus?: boolean;
    /** @default 'medium' */
    size?: Size;
    value?: Maybe<string | number>;
};

const cls = bem('base-input', { namespace: 'nh-components' });

/**
 * Creates BaseInput component.
 * @name ~/shared/components/Input/BaseInput
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const BaseInput = forwardRef((props: BaseInputProps, ref: InputBaseRef): ReactElement => {
    const {
        hasError,
        size,
        className,
        selectOnFocus,
        onFocus,
        value,
        ...restProps
    } = props;

    const handleFocus: FocusEventHandler<HTMLInputElement> = (eventData) => {
        if (selectOnFocus) {
            eventData.target.select();
        }

        onFocus?.(eventData);
    };

    const inputProps: DetailedHTMLProps<InputAttrs, HTMLInputElement> = {
        ...restProps,
        ref,
        value: value ?? '',
        onFocus: handleFocus,
        className: classNames(
            cls({
                hasError,
                sizeLarge: size === 'large',
                sizeSmall: size === 'small',
            }),
            className
        )
    };

    return <input {...inputProps} />;
});

BaseInput.displayName = 'BaseInput';
