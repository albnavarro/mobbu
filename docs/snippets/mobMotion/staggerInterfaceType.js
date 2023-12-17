/**
 * CreateStagger params.
 */
interface createStagger {
    /**
     * Target Array.
     */
    items: Array<HTMLElement | Object>;

    /**
     * Sequencer duration, default is 10 like normal sequencer.
     */
    duration?: number;

    /**
     * Staggerobject
     */
    stagger: {
        type?: 'equal' | 'start' | 'end' | 'center',
        each?: number,
        waitComplete?: boolean,
        from?:
            | 'start'
            | 'end'
            | 'center'
            | 'edges'
            | 'random'
            | { x: number, y: number }
            | number,
        grid?: {
            col: number,
            row: number,
            direction: 'row' | 'col' | 'radial',
        },
    };
}

/*
 * Array resulting from the createStagger function.
 */
interface staggerArray {
    item: HTMLElement | object;
    start: number;
    end: number;
    index: number;
}
