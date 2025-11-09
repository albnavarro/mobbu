import { MobJsStore } from '@mobJsType';

interface State extends Readonly<MobJsStore> {
    data: {
        label: string;
        url: string;
    }[];
    isVisible: boolean;
}

interface RightSideBarList {
    label: string;
    url: string;
}

export interface RightSidebar {
    state: State;
    methods: {
        updateList: (arg0: RightSideBarList[]) => void;
    };
}
