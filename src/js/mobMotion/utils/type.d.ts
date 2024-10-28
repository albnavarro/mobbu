import { allActionType } from '../animation/utils/tweenAction/type';

export type mqAction = 'min' | 'max';
export type mqActionMethods = 'min' | 'max' | 'get';
export type mqValues =
    | 'xSmall'
    | 'small'
    | 'medium'
    | 'tablet'
    | 'desktop'
    | 'large'
    | 'xLarge';

// Tween/Spring/Lerp commone action type

/**
 * Use T props, add props from U that not exist in T
 */
type Exactly<T, U> = T & Record<Exclude<keyof U, keyof T>, T>;

interface immediateNoPromise {
    immediateNoPromise: true;
}

export type SetData = (arg0: Record<string, number>) => void;

export type GoTo<K> = <T extends K>(
    obj: Record<string, number | (() => number)>,
    props?: T extends K ? K : T
) => Exactly<T, K> extends K
    ? ReturnType<DoAction<K>>
    : ReturnType<DoAction<T>>;

export type GoFrom<K> = <T extends K>(
    obj: Record<string, number | (() => number)>,
    props?: T extends K ? K : T
) => K & T extends K ? ReturnType<DoAction<K>> : ReturnType<DoAction<T>>;

export type GoFromTo<K> = <T extends K>(
    fromObj: Record<string, number | (() => number)>,
    toObj: Record<string, number | (() => number)>,
    props?: T extends K ? K : T
) => Exactly<T, K> extends K
    ? ReturnType<DoAction<K>>
    : ReturnType<DoAction<T>>;

export type Set<K> = <T extends K>(
    obj: Record<string, number | (() => number)>,
    props?: T extends K ? K : T
) => Exactly<T, K> extends K
    ? ReturnType<DoAction<K>>
    : ReturnType<DoAction<T>>;

export type DoAction<K> = (
    data: allActionType[],
    props?: K,
    obj: Record<string, number | (() => number)>
) => K extends immediateNoPromise ? void : Promise<void>;

export type tweenMergeProps = (props: tweenAction) => tweenDefault;
