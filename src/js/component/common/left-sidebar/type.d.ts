import { MobJsStore } from '@mobJsType';

interface LeftSideBarList {
    label: string;
    url: string;
}

export interface LeftSidebar {
    state: {
        data: {
            label: string;
            url: string;
        }[];
        isVisible: boolean;
    };
    bindStore: MobJsStore;
    methods: {
        updateList: (arg0: LeftSideBarList[]) => void;
    };
}
