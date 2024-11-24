export interface DebugOverlay {
    state: {
        active: boolean;
        listType: string;
    };
    methods: {
        toggle: () => void;
    };
}
