export interface NavigationSubmenu {
    props: {
        callback: (arg0: { forceClose: boolean }) => void;
        headerButton: Partial<{ label: string; url: string; activeId: number }>;
        children: any[];
        isOpen: boolean;
    };
    ref: {
        content: HTMLElement;
    };
}
