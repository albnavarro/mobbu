export interface LinksMobJsButton {
    label: string;
    url: string;
    active: boolean;
}

export interface LinksMobJs {
    data: { label: string; url: string; isLabel: boolean }[];
    activeSection: string;
}
