export interface DebugComponentType {
    state: {
        id: string;
    };
    methods: {
        updateId: (id: string) => void;
        refreshId: () => void;
    };
    ref: {
        screen: HTMLElement;
        scrollbar: HTMLInputElement;
        scroller: HTMLElement;
    };
}
