export interface AccessibilityToggleType {
    props: {
        option_a: {
            label: string;
            icon?: string;
            id?: string;
            callback: () => void;
        };
        option_b: {
            label: string;
            icon?: string;
            id?: string;
            callback: () => void;
        };
    };
}
