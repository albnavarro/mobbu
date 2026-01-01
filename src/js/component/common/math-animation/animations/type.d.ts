export type MathCommonAnimation = (arg0?: {
    targets?: HTMLElement[];
    container?: HTMLElement;
}) => {
    play: () => void;
    resume: () => void;
    stop: () => void;
    destroy: () => void;
};
