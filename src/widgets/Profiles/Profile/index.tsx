/**
 * Module contains `Profile` component.
 * @module widgets/profiles/profile
 */
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import React, { useEffect, useState } from 'react';

import type { LinkProps } from '../../../shared/components';
import { Icon, Img, LinkButton } from '../../../shared/components';
import type { models } from '../../../shared/stores';
import { bem } from '../../../shared/utils';

import './index.pcss';

type TProfile = Instance<typeof models.Profile>;

export type ProfileProps = Pick<LinkProps, 'onClick'> & {
    avatar: string;
    onLoaded: () => void;
    profile: TProfile
};

const cls = bem('profile', { namespace: 'nh-widgets-profiles' });

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
        <li className={cls({ locked })}>
            <LinkButton
                className={cls('link')}
                color="tertiary"
                onClick={onClick}
            >
                <Img
                    alt="avatar"
                    className={cls('image')}
                    src={avatar}
                    onLoad={onLoaded}
                />
                <span className={cls('name')}>
                    {profileName}
                </span>
            </LinkButton>
            {Boolean(locked) && (
                <Icon className={cls('icon')} name="lock" size={20} />
            )}
        </li>
    );
});
