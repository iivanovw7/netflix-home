/**
 * Module contains `Profile` component.
 * @module widgets/profiles/profile
 */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import avatar1 from '../../../../assets/img/avatar-stub-1.png?w=200&png&imagetools';
import avatar2 from '../../../../assets/img/avatar-stub-2.png?w=200&png&imagetools';
import avatar3 from '../../../../assets/img/avatar-stub-3.png?w=200&png&imagetools';
import avatar4 from '../../../../assets/img/avatar-stub-4.png?w=200&png&imagetools';
import avatar5 from '../../../../assets/img/avatar-stub-5.png?w=200&png&imagetools';
import { Icon, Img, Link } from '../../../shared/components';
import type { LinkProps } from '../../../shared/components';
import type { TProfile } from '../../../shared/globalStores/ProfileStore';
import { bem } from '../../../shared/utils';

import './index.pcss';

export type ProfileProps = Pick<LinkProps, 'onClick'> & {
    index: number;
    profile: TProfile,
};

const cls = bem('profile');

const avatarStubs = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5
];

/**
 * `Profile` component.
 * @constructor
 * @name pages/profiles/profile/Profile
 * @method
 * @param {object} props - contains component props.
 *
 * @return {ReactElement} React component with children.
 */
export const Profile = observer((props: ProfileProps) => {
    const { index, profile, onClick } = props;
    const { name: profileName, lock } = profile;
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        setLocked(Boolean(lock));
    }, [lock, profile]);

    return (
        <li className={cls({ locked })}>
            <Link className={cls('link')} onClick={onClick} color="tertiary">
                <Img
                    alt="avatar"
                    className={cls('image')}
                    src={avatarStubs[index]} />
                <span className={cls('name')}>
                    {profileName}
                </span>
            </Link>
            {locked && <Icon className={cls('icon')} size={20} name="lock" />}
        </li>
    );
});
