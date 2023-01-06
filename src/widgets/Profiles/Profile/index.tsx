/**
 * Module contains `Profile` component.
 * @module widgets/profiles/profile
 */
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import React, { useEffect, useState } from 'react';

import type { LinkProps } from '../../../shared/components';
import { Icon, Img, LinkButton } from '../../../shared/components';
import type { models } from '../../../shared/stores';

import cls from './index.module.pcss';

type TProfile = Instance<typeof models.Profile>;

export type ProfileProps = Pick<LinkProps, 'onClick'> & {
    avatar: string;
    onLoaded: () => void;
    profile: TProfile
};

/**
 * `Profile` component.
 * @constructor
 * @name ~/widgets/Profiles/Profile
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
export const Profile = observer((props: ProfileProps) => {
    const { profile, avatar, onClick, onLoaded } = props;
    const { name: profileName, lock } = profile;

    const [locked, setLocked] = useState<boolean>(false);

    useEffect(() => {
        setLocked(Boolean(lock));
    }, [lock, profile]);

    return (
        <li
            className={classNames(
                cls.profile,
                {
                    [cls.profileLocked]: locked
                }
            )}
        >
            <LinkButton
                className={cls.profileLink}
                color="tertiary"
                onClick={onClick}
            >
                <Img
                    alt="avatar"
                    className={cls.profileImage}
                    src={avatar}
                    onLoad={onLoaded}
                />
                <span className={cls.profileName}>
                    {profileName}
                </span>
            </LinkButton>
            {locked && (
                <Icon className={cls.profileIcon} name="lock" size={20} />
            )}
        </li>
    );
});
