export interface AccessibilityToggleType {
    props: {
        className: string;
        label: string;
        ariaLabel: string;
        options: {
            text: string;
            ariaLabel: string;
            icon?: string;
            id: string;
            default?: boolean;
            callback: () => void;
        }[];
    };
    state: {
        activeId: string;
    };
}
