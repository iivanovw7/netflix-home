/**
 * Module contains application header menu.
 * @module widgets/Header/Menu
 */
import bem from 'bem-ts';
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';

import placeholder from '../../../../assets/img/avatar-placeholder.png?w=32&png&imagetools';
import type { LinkProps } from '../../../shared/components';
import { AVATARS, DropdownMenu, Img, ItemTypeMap } from '../../../shared/components';
import { ctx } from '../../../shared/context';
import type { models } from '../../../shared/stores';
import { stores } from '../../../shared/stores';
import { isNumber } from '../../../shared/utils';
import { isValidCode } from '../../Profiles/model/utils';
import { getProfileUnlockProps } from '../../ProfileUnlock';

import './index.pcss';

type TProfile = Instance<typeof models.Profile>;

const cls = bem('header-menu', { namespace: 'nh-widgets' });

/**
 * Header Menu component.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
export const Menu = observer((): ReactElement => {
    const { profile: currentProfile, profiles, resetProfile, changeUserProfile } = stores.profile;

    const profileIndex = currentProfile?.index;

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
            withArrowToggle
            items={[
                ...profiles.map((profile) => ({
                    type: ItemTypeMap.link,
                    text: profile.name,
                    underline: 'hover' as LinkProps['underline'],
                    image: {
                        src: isNumber(profile.index)
                            ? AVATARS[profile.index]
                            : placeholder,
                        alt: 'avatar',
                        className: cls('avatar'),
                        size: 32
                    },
                    imagePosition: 'start',
                    onClick: handleProfileSelect(profile),
                })),
                { type: ItemTypeMap.divider },
                {
                    type: ItemTypeMap.link,
                    text: 'Sign out of Netflix',
                    underline: 'hover',
                    className: cls('logout'),
                    onClick: handleLogout
                }
            ]}
            offset={{
                alignmentAxis: 6,
                mainAxis: 30
            }}
            placement="bottom-start"
            toggleClassName={cls('toggle')}
        >
            <Img
                src={isNumber(profileIndex)
                    ? AVATARS[profileIndex as number]
                    : placeholder}
                alt="avatar"
                className={cls('avatar')}
                size={32}
            />
        </DropdownMenu>
    );
});

