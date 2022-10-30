/**
 * Module contains `Portal` component.
 * @module shared/components/Portal
 */
import type { PropsWithChildren, ReactElement } from 'react';
import { createPortal } from 'react-dom';

export type PortalProps = PropsWithChildren<{
    /** @default "portal-root" */
    portalId?: string;
}>;

export const Portal = (props: PortalProps): ReactElement => {
    const { portalId = 'portal-root', children } = props;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return createPortal(children, document.getElementById(portalId)!);
};
