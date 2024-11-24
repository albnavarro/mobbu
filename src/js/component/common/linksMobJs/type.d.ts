export interface LinksMobJsButton {
    state: {
        label: string;
        url: string;
        active: boolean;
    };
}

export interface LinksMobJs {
    state: {
        data: { label: string; url: string; isLabel: boolean }[];
        activeSection: string;
    };
}
