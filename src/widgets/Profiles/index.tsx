/**
 * Module contains `Profiles` page.
 * @module widgets/profiles/index.styled
 */

import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback, useEffect } from 'react';

import type { LinkProps } from '../../shared/components';
import { Button, Container, H1 } from '../../shared/components';
import { globalStore } from '../../shared/globalStores';
import type { TProfile } from '../../shared/globalStores/ProfileStore';
import { bem, uuid } from '../../shared/utils';

import { Profile } from './profile';

import './index.pcss';

const cls = {
    page: bem('page'),
    profiles: bem('profiles')
};

const MESSAGES = {
    button: 'Manage Profiles',
    title: "Who's watching?"
};

/**
 * `Profiles` page.
 * @constructor
 * @name pages/profiles/Profiles
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

    const handleClick = useCallback((profile: TProfile): LinkProps['onClick'] => () => {
        setProfile(profile);

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
                <Container className={cls.page('container')}>
                    <div className={cls.profiles()}>
                        <H1 className={cls.profiles('title')} text={MESSAGES.title} />
                        <ul className={cls.profiles('list')}>
                            {profiles.map((profile, index) => (
                                <Profile
                                    key={uuid()}
                                    index={index}
                                    profile={profile}
                                    onClick={handleClick(profile)} />
                            ))}
                        </ul>
                        <div className={cls.profiles('footer')}>
                            <Button
                                className={cls.profiles('button')}
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
