export type VerticalScroller = (arg0: {
    screen: HTMLElement;
    scroller: HTMLElement;
    scrollbar: HTMLInputElement;
}) => {
    init: () => void;
    destroy: () => void;
    refresh: () => void;
    updateScroller: () => void;
    move: (val: number) => void;
    goToTop: () => void;
};

export type SimpleIntroAnimation = (arg0: { refs: HTMLSVGElement[] }) => {
    playIntro: () => Promise<void>;
    playSvg: () => void;
    destroy: () => void;
};
