export type PageScroller = (arg0: {
    velocity: number;
    rootElement: HTMLElement;
}) => {
    freeze: () => void;
    unFreeze: () => void;
    destroy: () => void;
    stop: () => void;
    update: () => void;
};
