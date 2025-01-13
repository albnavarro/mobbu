export interface goToParamsType {
    prop: string;
    toValue: number;
    toFn: () => number;
    toIsFn: boolean;
    settled: boolean;
}

export interface goFromType {
    prop: string;
    fromValue: number;
    currentValue: number;
    fromFn: () => number;
    fromIsFn: boolean;
    settled: boolean;
}

export interface goFromToType {
    prop: string;
    fromValue: number;
    fromFn: () => number;
    fromIsFn: boolean;
    toValue: number;
    toFn: () => number;
    toIsFn: boolean;
    currentValue: number;
    settled: boolean;
}

export type allActionType = goToParamsType | goFromType | goFromToType;

export interface tweenParam {
    currentValue: number;
    fromFn: () => number;
    fromIsFn: boolean;
    fromValue: number;
    prop: string;
    settled: boolean;
    shouldUpdate: boolean;
    toFn: number;
    toIsFn: () => number;
    toValProcessed: number;
    toValue: number;
    toValueOnPause: number;
}

/**
 * Merge tween data
 * Mapped type.
 * Merge Type with TargetType
 */
type MergetTweenReturnType<Type, TargetType> = {
    [Property in keyof Type]: TargetType[Property];
};

export type MergeTweenData = <T extends Record<'prop', any>[]>(
    newData: allActionType[],
    data: T
) => MergetTweenReturnType<allActionType[], T>;

/**
 * Set Relative
 */
interface SetRelativeRequiredFileds {
    toValue: number;
    currentValue: number;
}

type SetRelative = <T extends Record<string, any>>(
    arr: (SetRelativeRequiredFileds & T)[],
    relative: boolean
) => (SetRelativeRequiredFileds & T)[];
