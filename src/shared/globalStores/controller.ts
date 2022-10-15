/**
 * Module contains global stores controller.
 * @module shared/globalStores
 */

export const controller = {
    stores: {} as IGlobalStore,

    init(stores: IGlobalStore): () => void {
        Object.assign(this.stores, stores);

        return () => this.stores;
    },
};
