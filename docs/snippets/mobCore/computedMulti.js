import { MobCore } from '../../../src/js/mobCore';

const myStore = MobCore.createStore({
    initialProp: 1,
    dependency1: 0,
    dependency2: 0,
});

myStore.computed('dependency1', ['initialProp'], ({ initialProp }) => {
    return initialProp * 2;
});

myStore.computed('dependency2', ['dependency1'], ({ dependency1 }) => {
    return dependency1 * 2;
});

console.log(myStore.get().initialProp); // 1
console.log(myStore.get().dependency1); // 2
console.log(myStore.get().dependency2); // 4
