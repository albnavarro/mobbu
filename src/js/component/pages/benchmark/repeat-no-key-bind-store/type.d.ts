import { ExternalStore } from '@stores/benchmark/type';

export interface BenchMarkExternal {
    bindStore: ExternalStore;
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
