export type PageScroller = (arg0: { velocity: number }) => {
    freeze: () => void;
    unFreeze: () => void;
    destroy: () => void;
};
