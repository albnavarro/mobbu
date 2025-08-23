import { ExternalStore } from '@stores/benchmark/type';

export interface BenchMarkExternal {
    state: Readonly<ExternalStore>;
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
