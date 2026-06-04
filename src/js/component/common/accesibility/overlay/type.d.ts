export interface AccessibilityOverlayType {
    state: {
        active: boolean;
    };
    methods: {
        open: () => void;
    };
    ref: {
        dialog: HTMLDialogElement;
    };
}
