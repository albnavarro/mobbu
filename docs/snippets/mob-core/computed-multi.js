import { MobCore } from '@mobCore';

const myStore = MobCore.createStore({
    initialProp: 1,
    dependency1: 0,
    dependency2: 0,
});

const proxi = myStore.getProxi();

myStore.computed(
    () => proxi.dependency1,
    () => {
        return proxi.initialProp * 2;
    }
);

myStore.computed(
    () => proxi.dependency2,
    () => {
        return proxi.dependency1 * 2;
    }
);

console.log(myStore.get().initialProp); // 1
console.log(myStore.get().dependency1); // 2
console.log(myStore.get().dependency2); // 4
