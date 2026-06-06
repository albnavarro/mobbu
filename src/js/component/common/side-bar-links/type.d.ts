export interface SideBarLinks {
    state: {
        data: { label: string; url: string; isLabel: boolean }[];
        activeSection: string;
        hide: boolean;
        shift: boolean;
        tabletVisible: boolean;
    };
    ref: {
        root: HTMLElement;
        screenEl: HTMLElement;
        scrollerEl: HTMLElement;
        scrollbar: HTMLInputElement;
    };
    methods: {
        toggleTablet: (visible: boolean) => void;
        getRoot: () => HTMLElement;
    };
}
