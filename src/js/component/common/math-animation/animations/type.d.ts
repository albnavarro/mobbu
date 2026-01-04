export type MathCommonAnimation = (arg0?: {
    targets?: HTMLElement[];
    container?: HTMLElement;
    canvas?: HTMLCanvasElement;
}) => {
    play: () => void;
    resume: () => void;
    stop: () => void;
    destroy: () => void;
};
