export type CaterpillarN2Button = Record<
    string,
    {
        label: string;
        method: string;
    }
>;

export interface CaterpillarN2 {
    state: {
        isMounted: boolean;
        numItems: number;
        width: number;
        height: number;
        radius: number;
        fill: number[];
        opacity: number;
        xAmplitude: number;
        yAmplitude: number;
        duration: number;
        rotationDefault: number;
        friction: number;
        disableOffcanvas: boolean;
        buttons: CaterpillarN2Button;
    };
    ref: {
        canvas: HTMLCanvasElement;
        rangeValue: HTMLSpanElement;
        rotationButton: HTMLButtonElement;
    };
}

export type CaterpillarN2Animation = (arg0: {
    canvas: HTMLCanvasElement;
    numItems: number;
    width: number;
    height: number;
    radius: number;
    fill: number[];
    opacity: number;
    xAmplitude: number;
    yAmplitude: number;
    duration: number;
    rotationDefault: number;
    friction: number;
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
