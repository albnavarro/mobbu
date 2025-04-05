import { GetRef } from '../../../../../../mob/mobjs/type';
import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: Omit<DebugFilterListItem['state'], 'currentId'>[];
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
