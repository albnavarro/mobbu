import { MobJsStore } from '@mobJsType';

interface State extends Readonly<MobJsStore> {
    data: {
        label: string;
        url: string;
    }[];
    isVisible: boolean;
}

interface LeftSideBarList {
    label: string;
    url: string;
}

export interface LeftSidebar {
    state: State;
    methods: {
        updateList: (arg0: LeftSideBarList[]) => void;
    };
}
