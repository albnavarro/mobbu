import { DocContainerStore } from '@stores/doc-container/type';
import { WithSource } from '@mobJsType';

export interface SideBarLinks {
    state: {
        data: { label: string; url: string; isLabel: boolean }[];
        activeSection: string;
        hide: boolean;
        shift: boolean;
    };
    ref: {
        screenEl: HTMLElement;
        scrollerEl: HTMLElement;
        scrollbar: HTMLInputElement;
    };
    bindStore: WithSource<DocContainerStore>;
    methods: {
        toggleTablet: (visible: boolean) => void;
    };
}
