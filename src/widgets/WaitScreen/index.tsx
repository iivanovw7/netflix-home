import { FloatingOverlay } from '@floating-ui/react';
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import React from 'react';

import placeholder from '../../../assets/img/avatar-placeholder.png?w=32&png&imagetools';
import { AVATARS, Img, Spinner } from '../../shared/components';
import type { models } from '../../shared/stores';
import { bem, isNumber } from '../../shared/utils';

import './index.pcss';

type TProfile = Instance<typeof models.Profile>;

export type WaitScreenProps = {
    profile?: Nullable<TProfile>;
};

const cls = bem('wait-screen', { namespace: 'nh-widgets' });

export const WaitScreen = observer((props: WaitScreenProps) => {
    const { profile } = props;
    const profileIndex = profile?.index;

    return (
        <FloatingOverlay lockScroll>
            <Spinner className={cls()} height={160} width={160}>
                {isNumber(profileIndex) && (
                    <Img
                        src={AVATARS[profileIndex as number] || placeholder}
                        alt="avatar"
                        className={cls('avatar')}
                        size={48}
                    />
                )}
            </Spinner>
        </FloatingOverlay>
    );
});
