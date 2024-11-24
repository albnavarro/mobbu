export interface CodeButton {
    drawers: { label: string; source: string }[];
    color: string;
}

export type UpdateCodeButton = (arg0: CodeButton) => void;
