export interface AccessibilityOverlayType {
    state: {
        active: boolean;
    };
    methods: {
        toggle: () => void;
    };
    ref: {
        dialog: HTMLDialogElement;
    };
}
