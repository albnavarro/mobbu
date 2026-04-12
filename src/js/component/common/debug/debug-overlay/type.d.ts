export interface DebugOverlayType {
    state: {
        active: boolean;
        listType: string;
    };
    methods: {
        toggle: () => void;
    };
}
