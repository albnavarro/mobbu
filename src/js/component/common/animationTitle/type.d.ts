export interface animationTitle {
    title: string;
    align: boolean;
}

type Values<T> = T[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type setStateRecord<T> = {
    [P in keyof T]: (prop: P, value: T[P]) => void;
};

type setState<T> = UnionToIntersection<Values<setStateRecord<T>>>;
