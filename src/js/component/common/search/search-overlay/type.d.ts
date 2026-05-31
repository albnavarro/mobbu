export interface SearchOverlay {
    state: {
        active: boolean;
        currentSearch: string;
    };
    methods: {
        close: () => void;
        open: () => void;
    };
    ref: {
        title: HTMLHeadElement;
        header: HTMLElement;
        dialog: HTMLDialogElement;
    };
}
