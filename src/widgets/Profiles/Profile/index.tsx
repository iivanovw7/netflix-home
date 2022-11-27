/**
 * Module contains `Profile` component.
 * @module widgets/profiles/profile
 */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { Icon, Img, Link } from '../../../shared/components';
import type { LinkProps } from '../../../shared/components';
import type { TProfile } from '../../../shared/stores/ProfileStore';
import { bem } from '../../../shared/utils';

import './index.pcss';

export type ProfileProps = Pick<LinkProps, 'onClick'> & {
    avatar: string;
    profile: TProfile,
    onLoaded: () => void;
};

const cls = bem('profile', { namespace: 'nh-widgets-profiles' });

/**
 * `Profile` component.
 * @constructor
 * @name widgets/profiles/profile/Profile
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
export const Profile = observer((props: ProfileProps) => {
    const { profile, avatar, onClick, onLoaded } = props;
    const { name: profileName, lock } = profile;

    const [locked, setLocked] = useState(false);

    useEffect(() => {
        setLocked(Boolean(lock));
    }, [lock, profile]);

    return (
        <li className={cls({ locked })}>
            <Link className={cls('link')}
                color="tertiary"
                onClick={onClick}>
                <Img
                    alt="avatar"
                    className={cls('image')}
                    src={avatar}
                    onLoad={onLoaded} />
                <span className={cls('name')}>
                    {profileName}
                </span>
            </Link>
            {locked && <Icon className={cls('icon')} name="lock" size={20} />}
        </li>
    );
});
