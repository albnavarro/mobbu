export interface DebugOverlay {
    state: {
        active: boolean;
        listType: string;
    };
    methods: {
        toggle: () => void;
    };
    ref: {
        toggle_tree: HTMLElement;
        toggle_filter: HTMLElement;
    };
}
