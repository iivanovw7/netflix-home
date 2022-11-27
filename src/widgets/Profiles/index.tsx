/**
 * Module contains `Profiles` page.
 * @module widgets/Profiles/index.styled
 */

import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import type { LinkProps } from '../../shared/components';
import { Button, Container, H1, AVATARS } from '../../shared/components';
import { ctx } from '../../shared/context';
import { stores } from '../../shared/stores';
import type { TProfile } from '../../shared/stores/ProfileStore';
import { bem, uuid } from '../../shared/utils';

import { isValidCode } from './model/utils';
import { Profile } from './Profile';
import { getUnlockModalProps } from './UnlockModal';

import './index.pcss';

const cls = {
    page: bem('page', { namespace: 'nh-widgets-profiles' }),
    box: bem('box', { namespace: 'nh-widgets-profiles-page' })
};

const MESSAGES = {
    button: 'Manage Profiles',
    title: "Who's watching?"
};

/**
 * `Profiles` page.
 * @constructor
 * @name widgets/Profiles
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
    } = stores;

    const [loaded, setLoaded] = useState(false);

    const handleLoaded = useCallback(() => {
        setLoaded(true);
    }, []);

    const handleClick = useCallback((profile: TProfile): LinkProps['onClick'] => () => {
        const { lock } = profile;

        if (lock && isValidCode(lock)) {
            ctx.modal.open(getUnlockModalProps({
                lock,
                onClose: ctx.modal.close,
                onSuccess: () => {
                    setProfile(profile);
                    ctx.modal.close();
                }
            }));
        }
        else {
            setProfile(profile);
        }
    }, [setProfile]);

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
                                    key={uuid()}
                                    avatar={AVATARS[index]}
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
