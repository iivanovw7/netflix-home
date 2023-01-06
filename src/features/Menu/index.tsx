/**
 * Module contains application header menu.
 * @module widgets/Header/Menu
 */
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import { defaultTo } from 'ramda';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import placeholder from '../../../assets/img/avatar-placeholder.png?w=32&png&imagetools';
import type { DropdownMenuProps } from '../../shared/components';
import { AVATARS, DropdownMenu, Img, ItemTypeMap } from '../../shared/components';
import { ctx } from '../../shared/context';
import { useBreakpoints } from '../../shared/hooks';
import type { models } from '../../shared/stores';
import { stores } from '../../shared/stores';
import { isValidCode } from '../../shared/utils';
import { getProfileUnlockProps } from '../ProfileUnlock';

import cls from './index.module.pcss';

type TProfile = Instance<typeof models.Profile>;

const withAvatarPlaceholder = defaultTo(placeholder);

/**
 * Header Menu component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Menu = observer((): ReactElement => {
    const { profile: currentProfile, profiles, resetProfile, changeUserProfile } = stores.profile;
    const { mdUp } = useBreakpoints('md');

    const handleLogout = useCallback(() => {
        resetProfile();
    }, [resetProfile]);

    const handleProfileSelect = useCallback((profile: TProfile) => async () => {
        const { lock } = profile;

        if (lock && isValidCode(lock)) {
            resetProfile();

            ctx.modal.open(getProfileUnlockProps({
                lock,
                onClose: ctx.modal.close,
                onSuccess: async () => {
                    ctx.modal.close();
                    await changeUserProfile(profile);
                }
            }));
        }
        else {
            await changeUserProfile(profile);
        }
    }, [resetProfile, changeUserProfile]);

    return (
        <DropdownMenu
            withArrowFloating
            withArrowToggle={mdUp}
            items={[
                ...profiles.map((profile) => ({
                    type: ItemTypeMap.link,
                    text: profile.name,
                    underline: 'hover',
                    image: {
                        src: withAvatarPlaceholder(AVATARS[profile.index]),
                        alt: 'avatar',
                        className: cls.menuAvatar,
                        size: 26
                    },
                    imagePosition: 'start',
                    onClick: handleProfileSelect(profile),
                })) as DropdownMenuProps['items'],
                {
                    type: ItemTypeMap.divider
                },
                {
                    type: ItemTypeMap.link,
                    text: 'Sign out of Netflix',
                    underline: 'hover',
                    className: cls.menuLogout,
                    onClick: handleLogout
                }
            ]}
            offset={{
                alignmentAxis: 6,
                mainAxis: 30
            }}
            placement="bottom-start"
            toggleClassName={cls.menuToggle}
        >
            <Img
                src={withAvatarPlaceholder(AVATARS[currentProfile?.index as number])}
                alt="avatar"
                className={cls.menuAvatar}
                size={26}
            />
        </DropdownMenu>
    );
});

