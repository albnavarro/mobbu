import { MobCore } from '../../../src/js/mobCore';

const myStore = MobCore.createStore({
    prop: 0,
    dependency1: 1,
    dependency2: 2,
});

myStore.computed(
    'prop',
    ({ dependency1, dependency2 }) => {
        return dependency1 + dependency2;
    },
    ['dependency1', 'dependency2']
);

console.log(myStore.get().prop); // 3

myStore.set('prop', 2); // Error
