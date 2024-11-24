export interface CodeButton {
    state: { drawers: { label: string; source: string }[]; color: string };
}

export type UpdateCodeButton = (arg0: CodeButton['state']) => void;
