export interface SearchOverlay {
    state: {
        active: boolean;
        currentSearch: string;
    };
    methods: {
        toggle: () => void;
        open: () => void;
    };
}
