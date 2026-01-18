export type CaterpillarN2Button = Record<
    string,
    {
        label: string;
        method: string;
    }
>;

export interface CaterpillarN2 {
    props: {
        background: string;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
        buttons: CaterpillarN2Button;
        rotationDefault: number;
        controlsActive: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        rangeValue: HTMLSpanElement;
        rotationButton: HTMLButtonElement;
    };
}

export type CaterpillarN2Animation = (arg0: {
    canvas: HTMLCanvasElement;
    rotationDefault: number;
    disableOffcanvas: boolean;
}) => {
    destroy: () => void;
    play: () => void;
    playReverse: () => void;
    playUseCurrent: () => void;
    playReverseUseCurrent: () => void;
    playFromLabel: () => void;
    plaFromLabelReverse: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    reverse: () => void;
    setRotation: (value: number) => void;
};
