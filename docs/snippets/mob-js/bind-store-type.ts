import { MobJsStore, WithSource } from '@mobJsType';

interface MyComponent {
    state: {
        label: string;
        section: string;
        active: boolean;
    };
    bindStore: WithSource<MobJsStore>;
}
