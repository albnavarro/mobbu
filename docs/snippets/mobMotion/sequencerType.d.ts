interface MobSequencer {
    data: { [key: string]: number | (() => number) };
    duration?: number;
    ease?:
        | 'easeLinear'
        | 'easeInQuad'
        | 'easeOutQuad'
        | 'easeInOutQuad'
        | 'easeInCubic'
        | 'easeOutCubic'
        | 'easeInOutCubic'
        | 'easeInQuart'
        | 'easeOutQuart'
        | 'easeInOutQuart'
        | 'easeInQuint'
        | 'easeOutQuint'
        | 'easeInOutQuint'
        | 'easeInSine'
        | 'easeOutSine'
        | 'easeInOutSine'
        | 'easeInExpo'
        | 'easeOutExpo'
        | 'easeInOutExpo'
        | 'easeInCirc'
        | 'easeOutCirc'
        | 'easeInOutCirc'
        | 'easeInElastic'
        | 'easeOutElastic'
        | 'easeInOutElastic'
        | 'easeInBack'
        | 'easeOutBack'
        | 'easeInOutBack'
        | 'easeInBounce'
        | 'easeOutBounce'
        | 'easeInOutBounce';
    stagger?: {
        type?: 'equal' | 'start' | 'end' | 'center';
        each?: number;
        waitComplete?: boolean;
        from?:
            | 'start'
            | 'end'
            | 'center'
            | 'edges'
            | 'random'
            | { x: number; y: number }
            | number;
        grid?: {
            col: number;
            row: number;
            direction: 'row' | 'col' | 'radial';
        };
    };
}
