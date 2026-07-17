export interface ScrollDownLabel {
    state: {
        active: boolean;
    };
    methods: {
        update: (isActive: boolean) => void;
    };
}
