import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: DebugFilterListItem[];
        isLoading: boolean;
    };
    methods: {
        refreshList: (arg0: { testString: string }) => void;
    };
}
