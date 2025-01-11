export interface AnimationTitle {
    state: { title: string; align: string; color: string };
    ref: {
        titleEl: HTMLElement;
    };
}

export type UpdateAnimationTitle = (arg0: AnimationTitle['state']) => void;
