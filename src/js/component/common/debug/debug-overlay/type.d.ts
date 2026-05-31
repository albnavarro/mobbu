export interface DebugOverlayType {
    state: {
        active: boolean;
        listType: string;
    };
    methods: {
        open: () => void;
    };
    ref: {
        header: HTMLElement;
        dialog: HTMLDialogElement;
    };
}
