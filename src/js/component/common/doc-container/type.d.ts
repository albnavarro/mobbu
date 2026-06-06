export interface DocContainerType {
    state: {
        rightSidebarVisible: boolean;
    };
    ref: {
        asideRight: HTMLElement;
        asideToggleButton: HTMLButtonElement;
    };
    methods: {
        closeSidebarLeft: () => void;
    };
}
