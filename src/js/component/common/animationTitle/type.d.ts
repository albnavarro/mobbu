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

type EmitRecord = {
    [P in keyof animationTitle]: (prop: P, value: animationTitle[P]) => void;
};

type setState = UnionToIntersection<Values<EmitRecord>>;
