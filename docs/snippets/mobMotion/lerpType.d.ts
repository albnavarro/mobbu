interface MobLerp {
    data: { [key: string]: number | (() => number) };
    relative?: boolean;
    precision?: number;
    velocity?: number;
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
