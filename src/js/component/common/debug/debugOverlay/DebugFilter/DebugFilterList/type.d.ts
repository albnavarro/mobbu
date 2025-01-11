import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: DebugFilterListItem['state'][];
        isLoading: boolean;
    };
    methods: {
        refreshList: (arg0: { testString: string }) => void;
    };
    ref: {
        loadingRef: HTMLElement;
        noresultRef: HTMLElement;
        scrollbar: HTMLInputElement;
        screen: HTMLElement;
        scroller: HTMLElement;
    };
}
