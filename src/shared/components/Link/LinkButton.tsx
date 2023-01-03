/**
 * Module contains `LinkButton` element.
 * @module ~/shared/components/LinkButton
 */
import React, { forwardRef } from 'react';

import type { LinkProps } from './index';
import { Link } from './index';

export type LinkButtonProps = Omit<LinkProps, 'tag' | 'href'>;

/**
 * Creates `LinkButton` component.
 * @name ~/shared/components/LinkButton
 * @method
 * @param {object} props - contains component props.
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
    (props, ref) => <Link ref={ref} tag="button" {...props} />
);

LinkButton.displayName = 'LinkButton';

