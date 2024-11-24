import { DebugFilterListItem } from './DebugFilterLitItem/type';

export interface DebugFilterList {
    state: {
        data: DebugFilterListItem['state'][];
        isLoading: boolean;
    };
    methods: {
        refreshList: (arg0: { testString: string }) => void;
    };
}
