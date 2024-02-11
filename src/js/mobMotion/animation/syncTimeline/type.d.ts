export interface syncTimelineType {
    duration?: number;
    yoyo?: boolean;
    repeat?: number;
}

export interface syncTimelineSequencers {
    draw: (arg0: {
        partial: number;
        isLastDraw: boolean;
        useFrame: boolean;
        direction: string;
    }) => void;
    getLabels: () => { name: string; time: number }[];
    inzializeStagger: () => void;
    disableStagger: () => void;
    cleanCachedId: () => void;
    resetLastValue: () => void;
    destroy: () => void;
    setStretchFactor: (arg0: number) => void;
}

export interface syncTimelineEventType {
    id: number;
    cb: function;
}
