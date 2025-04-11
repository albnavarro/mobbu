import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    refSet: () => ({
        value: new Set(),
        type: Set,
    }),
});

/**
 * Update a Set without modify original reference.
 * If no clone ( or original Set is returned ) original set will be equal new.
 */
myStore.updateState(
    'refSet',
    (value) => {
        return value.add(mobCore.getUnivoqueId());
    },
    { clone: true, emit: true }
);
