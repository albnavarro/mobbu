import { MobJsStore, WithSource } from '@mobJsType';

interface LeftSideBarList {
    label: string;
    url: string;
    children: string[];
}

export interface LeftSidebar {
    state: {
        data: LeftSideBarList[];
        baseRoutes: { baseRoute: string; currentRoute: string }[];
        isVisible: boolean;
    };
    bindStore: WithSource<MobJsStore>;
    methods: {
        updateList: (arg0: LeftSideBarList[]) => void;
    };
}
