export interface RouteLoader {
    state: {
        isDisable: boolean;
        isLoading: boolean;
        skip: boolean;
    };
    methods: {
        skip: (shouldSkip: boolean) => void;
    };
}
