/**
 * Module contains `Profiles` selector component.
 * @module ~/widgets/Profiles
 */

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import type { Instance } from 'mobx-state-tree';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { getProfileUnlockProps } from '../../features';
import type { LinkProps } from '../../shared/components';
import { Button, Container, H1, AVATARS } from '../../shared/components';
import { ctx } from '../../shared/context';
import type { models } from '../../shared/stores';
import { stores } from '../../shared/stores';
import { uuid, isValidCode } from '../../shared/utils';

import cls from './index.module.pcss';
import { Profile } from './Profile';

type TProfile = Instance<typeof models.Profile>;

const MESSAGES = {
    button: 'Manage Profiles',
    title: "Who's watching?"
};

/**
 * `Profiles` selector component..
 * @constructor
 * @name ~/widgets/Profiles
 * @method
 * @return {ReactElement} React component with children.
 */
export const Profiles = observer((): ReactElement => {
    const {
        profile: {
            profiles,
            changeUserProfile
        },
    } = stores;

    const [loaded, setLoaded] = useState(false);

    const handleLoaded = useCallback(() => {
        setLoaded(true);
    }, []);

    const handleClick = useCallback((profile: TProfile): LinkProps['onClick'] => async () => {
        const { lock } = profile;

        if (lock && isValidCode(lock)) {
            ctx.modal.open(getProfileUnlockProps({
                lock,
                onClose: ctx.modal.close,
                onSuccess: async () => {
                    await changeUserProfile(profile);
                    ctx.modal.close();
                }
            }));
        }
        else {
            await changeUserProfile(profile);
        }
    }, [changeUserProfile]);

    return (
        <div className={cls.page}>
            <div className={cls.pageContent}>
                <Container
                    className={classNames(
                        cls.pageContent,
                        {
                            [cls.pageContainerLoaded]: loaded
                        }
                    )}
                >
                    <div className={cls.pageBox}>
                        <H1 className={cls.pageBoxTitle} text={MESSAGES.title} />
                        <ul className={cls.pageBoxList}>
                            {profiles.map((profile, index) => (
                                <Profile
                                    key={uuid()}
                                    avatar={AVATARS[index]}
                                    profile={profile}
                                    onClick={handleClick(profile)}
                                    onLoaded={handleLoaded}
                                />
                            ))}
                        </ul>
                        <div className={cls.pageBoxFooter}>
                            <Button
                                className={cls.pageBoxButton}
                                color="tertiary"
                                fill="outlined"
                                text={MESSAGES.button}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
});
