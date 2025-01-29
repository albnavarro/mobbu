export interface SvgChild {
    state: {
        star: string;
        svg: string;
    };
    ref: {
        trail0: SVGGElement;
        trail1: SVGGElement;
        trail2: SVGGElement;
        trail3: SVGGElement;
        trail4: SVGGElement;
        trail5: SVGGElement;
        trail6: SVGGElement;
        trail7: SVGGElement;
        trail8: SVGGElement;
        trail9: SVGGElement;
    };
}

export type ChildAnimation = (arg0: {
    groups: HTMLElement[];
    trails: SVGGElement[];
}) => {
    playIntro: () => Promise<void>;
    destroy: () => void;
};
