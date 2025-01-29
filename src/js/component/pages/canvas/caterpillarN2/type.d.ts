export interface CaterpillarN2 {
    state: {
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
        buttons: any;
    };
    ref: {
        wrap: HTMLElement;
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
