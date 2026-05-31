export interface DebugOverlayType {
    state: {
        active: boolean;
        listType: string;
    };
    methods: {
        open: () => void;
    };
    ref: {
        title: HTMLHeadElement;
        dialog: HTMLDialogElement;
    };
}
