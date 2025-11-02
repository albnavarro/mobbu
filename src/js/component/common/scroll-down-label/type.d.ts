export interface ScrollDownLabel {
    state: {
        active: boolean;
    };
    methods: {
        update: (active: boolean) => void;
    };
}
