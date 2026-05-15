import { WithSource } from '@mobJsType';
import { ExternalStore } from '@stores/benchmark/type';

export interface BenchMarkExternal {
    bindStore: WithSource<ExternalStore>;
    ref: {
        loading: HTMLElement;
        input: HTMLInputElement;
    };
}
