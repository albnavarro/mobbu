export const params = [
    {
        label: 'random',
        params: {
            stagger: {
                type: 'equal',
                each: 6,
                from: 'random',
            },
        },
    },
    {
        label: 'column',
        params: {
            stagger: {
                type: 'equal',
                each: 7,
                from: 'center',
                grid: { col: 11, row: 10, direction: 'col' },
            },
        },
    },
    {
        label: 'row',
        params: {
            stagger: {
                type: 'equal',
                each: 3,
                from: 'start',
                grid: { col: 11, row: 10, direction: 'row' },
            },
        },
    },
    {
        label: 'sequential',
        params: {
            stagger: {
                type: 'equal',
                each: 2,
                from: 'end',
            },
        },
    },
];
