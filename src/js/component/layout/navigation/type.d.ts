export interface NavigationContainer {
    state: {
        isOpen: boolean;
        isMounted: boolean;
    };
    methods: {
        scrollTop: () => void;
        refresh: () => void;
    };
}
