import { mobStore } from '../mobCore/store/MapVersion/index.js';

export const initTestMapStore = () => {
    const test = mobStore({ test: 2, pippo: 3 });
    test.get();
    test.set();

    const test2 = mobStore({ test: 20 });
    test2.get();
    test2.set();
};
