import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: DebugFilterListItem[];
        isLoading: boolean;
    };
}
