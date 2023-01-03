import { types } from 'mobx-state-tree';

export const Profile = types.model('Profile', {
    id: types.string,
    name: types.string,
    lock: types.union(types.maybe(types.string), types.null),
    index: types.number
});
