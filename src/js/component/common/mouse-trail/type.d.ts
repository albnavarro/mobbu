export interface MouseRotate {
    ref: {
        star: HTMLElement;
    };
}

export type MouseRotateAnimation = (arg0: { elements: HTMLElement[] }) => {
    destroy: () => void;
};
