import { WithSource } from '@mobJsType';
import { DocContainerStore } from '@stores/doc-container/type';

export interface DocContainerType {
    state: {
        rightSidebarVisible: boolean;
    };
    ref: {
        asideRight: HTMLElement;
        asideToggleButton: HTMLButtonElement;
    };
    bindStore: WithSource<DocContainerStore>;
    methods: {
        closeSidebarRight: () => void;
    };
}
