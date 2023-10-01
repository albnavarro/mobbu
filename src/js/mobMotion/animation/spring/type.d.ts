export interface springProps {
    friction: number;
    mass: number;
    precision: number;
    tension: number;
    velocity: number;
}

export interface springPresentConfigType {
    default?: springProps;
    gentle?: springProps;
    wobbly?: springProps;
    bounce?: springProps;
    scroller?: springProps;
    default?: springProps;
    [key: string]: springProps;
}

export type springChoiceConfig =
    | 'default'
    | 'gentle'
    | 'wobbly'
    | 'bounce'
    | 'scroller';
