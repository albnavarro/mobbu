export interface AnimationTitle {
    state: { title: string; align: string; color: string };
}

export type UpdateAnimationTitle = (arg0: AnimationTitle['state']) => void;
