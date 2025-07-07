export interface SearchOverlay {
    state: {
        active: boolean;
    };
    methods: {
        toggle: () => void;
    };
}
