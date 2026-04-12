import { GetRef } from '@mobJsType';
import { DebugFilterListItemType } from './item/type';

export interface DebugFilterListType {
    state: {
        data: Omit<DebugFilterListItemType['props'], 'currentId'>[];
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
