import { WithSource } from '@mobJsType';

export type StoreOne = WithSource<Store2> & {
    prop1: number;
    sum: number;
};

interface Store2 {
    prop2: number;
}
