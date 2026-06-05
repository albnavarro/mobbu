export interface AccessibilityToggleType {
    props: {
        className: string;
        name: string;
        options: {
            value: string;
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
