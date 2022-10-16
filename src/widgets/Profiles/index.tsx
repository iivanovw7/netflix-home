/**
 * Module contains `Profiles` page.
 * @module widgets/profiles/index.styled
 */

import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import avatar1 from '../../../assets/img/avatar-stub-1.png?w=200&png&imagetools';
import avatar2 from '../../../assets/img/avatar-stub-2.png?w=200&png&imagetools';
import avatar3 from '../../../assets/img/avatar-stub-3.png?w=200&png&imagetools';
import avatar4 from '../../../assets/img/avatar-stub-4.png?w=200&png&imagetools';
import avatar5 from '../../../assets/img/avatar-stub-5.png?w=200&png&imagetools';
import type { LinkProps } from '../../shared/components';
import { Button, Container, H1 } from '../../shared/components';
import { ctx } from '../../shared/context';
import { globalStore } from '../../shared/globalStores';
import type { TProfile } from '../../shared/globalStores/ProfileStore';
import { bem, uuid } from '../../shared/utils';

import { Profile } from './profile';

import './index.pcss';

const cls = {
    page: bem('page', { namespace: 'nh-widgets-profiles' }),
    box: bem('box', { namespace: 'nh-widgets-profiles-page' })
};

const MESSAGES = {
    button: 'Manage Profiles',
    title: "Who's watching?"
};

const AVATARS = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5
];

/**
 * `Profiles` page.
 * @constructor
 * @name widgets/profiles/Profiles
 * @method
 * @return {ReactElement} React component with children.
 */
export const Profiles = observer((): ReactElement => {
    const {
        profile: {
            profiles,
            loadProfiles,
            setProfile
        },
    } = globalStore;

    const [loaded, setLoaded] = useState(false);

    const handleLoaded = useCallback(() => {
        setLoaded(true);
    }, []);

    const handleClick = useCallback((profile: TProfile): LinkProps['onClick'] => () => {
        if (profile.lock) {
            ctx.modal.open({});
        }
        else {
            setProfile(profile);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // eslint-disable-next-line no-void
        void loadProfiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cls.page()}>
            <div className={cls.page('content')}>
                <Container className={cls.page('container', { loaded })}>
                    <div className={cls.box()}>
                        <H1 className={cls.box('title')} text={MESSAGES.title} />
                        <ul className={cls.box('list')}>
                            {profiles.map((profile, index) => (
                                <Profile
                                    avatar={AVATARS[index]}
                                    key={uuid()}
                                    profile={profile}
                                    onClick={handleClick(profile)}
                                    onLoaded={handleLoaded} />
                            ))}
                        </ul>
                        <div className={cls.box('footer')}>
                            <Button
                                className={cls.box('button')}
                                color="tertiary"
                                fill="outlined"
                                text={MESSAGES.button} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
});
