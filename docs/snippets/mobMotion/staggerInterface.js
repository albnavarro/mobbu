interface stagger {
    each?: number;
    waitComplete?: boolean;
    from?:
        | 'start'
        | 'end'
        | 'center'
        | 'edges'
        | 'random'
        | { x: number, y: number }
        | number;
    grid?: {
        col: number,
        row: number,
        direction: 'row' | 'col' | 'radial',
    };
}
