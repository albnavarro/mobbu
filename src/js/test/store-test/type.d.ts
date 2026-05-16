import { MobJsStore, WithSource } from '@mobJsType';

export type StoreTest = WithSource<MobJsStore> &
    WithSource<proxiStore> & {
        prop: number;
        myComputed: number;
        myComputed2: number;
        myComputed3: number;
        obj: {
            prop4: number;
        };
        obj2: any;
    };

export interface proxiStore {
    proxiProp: number;
}
