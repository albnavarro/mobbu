export interface DebugComponentType {
    state: {
        id: string;
        parentId: string;
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
