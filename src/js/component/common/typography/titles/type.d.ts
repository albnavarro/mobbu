export interface Title {
    props: {
        tag: string;
        color: 'inherit' | 'white' | 'hightlight' | 'black';
        isSection: boolean;
        isBold: boolean;
        index: string;
    };
}

export type SectionPinAnimation = (arg0: { element: HTMLElement }) => {
    destroy: () => void;
};
