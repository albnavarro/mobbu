export const params = [
    {
        label: 'asymmetric row',
        params: {
            fill: [16, 27, 38, 49, 60, 71, 82, 93],
            numberOfColumn: 10,
            numberOfRow: 10,
            stagger: {
                each: 5,
                grid: { col: 11, row: 11, direction: 'row' },
                waitComplete: false,
            },
            reorder: true,
        },
    },
    {
        label: 'random',
        params: {
            fill: [
                0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96, 113,
                117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
            ],
            numberOfColumn: 20,
            numberOfRow: 10,
            stagger: {
                each: 2,
                from: 'random',
                waitComplete: false,
            },
            reorder: false,
        },
    },
    {
        label: 'edges',
        params: {
            fill: [
                0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96, 113,
                117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
            ],
            numberOfColumn: 10,
            numberOfRow: 10,
            stagger: {
                each: 10,
                from: 'edges',
                waitComplete: false,
            },
            reorder: false,
        },
    },
    {
        label: 'radial',
        params: {
            fill: [],
            numberOfColumn: 8,
            numberOfRow: 9,
            stagger: {
                each: 20,
                from: { x: 4, y: 4 },
                grid: {
                    col: 9,
                    row: 9,
                    direction: 'radial',
                },
                waitComplete: false,
            },
            reorder: false,
        },
    },
];
