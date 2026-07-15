import { MobJsStore, WithSource } from '@mobJsType';

interface LeftSidebarList {
    name: string;
    hash: string;
    children: LeftSidebarList[];
}

export interface LeftSidebar {
    state: {
        data: LeftSidebarList[];
        isVisible: boolean;
    };
    bindStore: WithSource<MobJsStore>;
    methods: {
        updateList: (arg0: LeftSidebarList[]) => void;
    };
}
