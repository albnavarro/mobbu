export interface RouteLoader {
    state: {
        isDisable: boolean;
        isLoading: boolean;
        skip: boolean;
    };
    methods: {
        skip: (value: boolean) => void;
    };
}
