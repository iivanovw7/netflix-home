/**
 * Module contains global modal context.
 * @module shared/components/Modal/modalContext
 */
import { noop } from '../../utils';

import type { ModalManagerRef } from './ModalManager';

export const defaultModalContext: ModalManagerRef = {
    close: noop,
    open: noop,
    setProps: noop,
    contentRef: { current: null },
    backdropRef: { current: null },
};
