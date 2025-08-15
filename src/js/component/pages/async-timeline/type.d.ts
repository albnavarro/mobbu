export type AsyncTimelineControls = Record<
    string,
    {
        label: string;
        method: string;
    }
>;

export type CaterpillarN2Button = Record<
    string,
    {
        label: string;
        method: string;
    }
>;
export interface AsyncTimeline {
    state: {
        isMounted: boolean;
        disableOffcanvas: boolean;
        buttons: AsyncTimelineControls;
    };
    ref: {
        canvas: HTMLCanvasElement;
    };
}

export type AsyncTimelineAnimation = (arg0: {
    canvas: HTMLCanvasElement;
    disableOffcanvas: boolean;
}) => {
    destroy: () => void;
    play: () => void;
    playReverse: () => void;
    playFromLabel: () => void;
    playFromLabelReverse: () => void;
    revertNext: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
};
