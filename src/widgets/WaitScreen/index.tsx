/**
 * Module contains `WaitScreen` modal component.
 * @module ~/widgets/WaitScreen
 */
import { FloatingOverlay } from '@floating-ui/react';
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import { defaultTo } from 'ramda';
import React from 'react';

import placeholder from '../../../assets/img/avatar-placeholder.png?w=32&png&imagetools';
import { AVATARS, Img, Spinner } from '../../shared/components';
import type { models } from '../../shared/stores';
import { isNumber } from '../../shared/utils';

import cls from './index.module.pcss';

type TProfile = Instance<typeof models.Profile>;

export type WaitScreenProps = {
    profile?: Nullable<TProfile>;
};

const withAvatarPlaceholder = defaultTo(placeholder);

export const WaitScreen = observer((props: WaitScreenProps) => {
    const { profile } = props;
    const profileIndex = profile?.index;

    return (
        <FloatingOverlay lockScroll>
            <Spinner className={cls.waitScreen} height={160} width={160}>
                {isNumber(profileIndex) && (
                    <Img
                        src={withAvatarPlaceholder(AVATARS[profileIndex as number])}
                        alt="avatar"
                        className={cls.waitScreenAvatar}
                        size={48}
                    />
                )}
            </Spinner>
        </FloatingOverlay>
    );
});
