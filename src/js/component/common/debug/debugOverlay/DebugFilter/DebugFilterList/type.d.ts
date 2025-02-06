import { GetRef } from '../../../../../../mobjs/type';
import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: DebugFilterListItem['state'][];
        isLoading: boolean;
        noResult: boolean;
    };
    methods: {
        refreshList: (arg0: { testString: string }) => void;
    };
    ref: {
        scrollbar: HTMLInputElement;
        screen: HTMLElement;
        scroller: HTMLElement;
    };
}

export type DebugInitScroller = (arg0: { getRef: GetRef }) => Promise<{
    destroy: () => void;
    move: (val: number) => void;
    refresh: () => void;
    updateScroller: () => void;
}>;
