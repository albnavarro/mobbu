import { MobJsStore, WithSource } from '@mobJsType';

export interface HeaderMainMenuButton {
    props: {
        label: string;
        section: string;
        url: string;
    };
    state: {
        active: boolean;
    };
    bindStore: WithSource<MobJsStore>;
}
