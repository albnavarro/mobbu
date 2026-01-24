import { ProxiState } from '@mobJsType';

export type CaterpillarN2Button = Record<
    string,
    {
        label: string;
        method: string;
    }
>;

export interface CaterpillarN2 {
    props: {
        background: string;
        disableOffcanvas: boolean;
    };
    state: {
        isMounted: boolean;
        buttons: CaterpillarN2Button;
        rotation: number;
        rotationlabel: number;
        controlsActive: boolean;
    };
    ref: {
        canvas: HTMLCanvasElement;
        inputRange: HTMLInputElement;
    };
}

export type CaterpillarN2Animation = (arg0: {
    canvas: HTMLCanvasElement;
    proxi: ProxiState<CaterpillarN2>;
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
};
