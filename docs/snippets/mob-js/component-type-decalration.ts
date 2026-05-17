import { WithSource } from '@mobJsType';
import { ExternalStore } from '@stores/external-store/type';

interface MyComponent {
    props: {
        active: boolean;
    };
    state: {
        color: string;
    };
    bindStore: WithSource<ExternalStore>;
    methods: {
        myMethod: (arg0: { prop1: number; prop2: number }) => void;
    };
    ref: {
        myRef: HTMLElement;
        myRef2: HTMLElement;
    };
}
