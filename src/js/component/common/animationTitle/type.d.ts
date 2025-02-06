export interface AnimationTitle {
    state: { title: string; align: string; color: string; isMounted: boolean };
}

export type UpdateAnimationTitle = (
    arg0: Partial<AnimationTitle['state']>
) => void;
