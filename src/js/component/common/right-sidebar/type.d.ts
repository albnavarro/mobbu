import { MobJsStore } from '@mobJsType';

interface State extends Readonly<MobJsStore> {
    data: {
        label: string;
        url: string;
    }[];
    isVisible: boolean;
}

export interface RightSidebar {
    state: State;
    methods: {
        updateList: (
            arg0: {
                label: string;
                url: string;
            }[]
        ) => void;
    };
}
