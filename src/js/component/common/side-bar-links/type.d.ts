import { DocContainerStore } from '@stores/doc-container/type';
import { WithSource } from '@mobJsType';

export interface SideBarLinks {
    state: {
        data: { label: string; url: string; isLabel: boolean }[];
        activeSection: string;
        hide: boolean;
        disable: boolean;
    };
    ref: {
        rootEl: HTMLElement;
        screenEl: HTMLElement;
        scrollerEl: HTMLElement;
        scrollbar: HTMLInputElement;
    };
    bindStore: WithSource<DocContainerStore>;
    methods: {
        getRoot: () => HTMLElement;
    };
}
