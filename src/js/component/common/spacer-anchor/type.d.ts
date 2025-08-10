export interface SpacerAnchor {
    state: {
        style: 'x-small' | 'small' | 'medium' | 'big';
        line: boolean;
        id: string;
        label: string;
        isSection: boolean;
        isNote: boolean;
    };
}
