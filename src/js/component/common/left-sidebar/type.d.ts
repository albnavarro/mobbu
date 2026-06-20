import { MobJsStore, WithSource } from '@mobJsType';

interface LeftSideBarList {
    name: string;
    hash: string;
    children: LeftSideBarList[];
}

export interface LeftSidebar {
    state: {
        data: LeftSideBarList[];
        isVisible: boolean;
    };
    bindStore: WithSource<MobJsStore>;
    methods: {
        updateList: (arg0: LeftSideBarList[]) => void;
    };
}
