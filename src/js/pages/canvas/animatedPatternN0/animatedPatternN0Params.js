export const animatedPatternN0Params = [
    {
        animation: {},
        nav: {
            prevRoute: '#caterpillarN2',
            nextRoute: '#animatedPatternN0?version=1&activeId=1',
            backRoute: '#canvas-overview',
        },
    },
    {
        title: 'Animated pattern N.0 v1',
        animation: {
            fill: [
                0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96, 113,
                117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
            ],
            gutter: 1,
            numberOfColumn: 20,
            numberOfRow: 10,
            cellWidth: 50,
            cellHeight: 50,
            stagger: {
                each: 2,
                from: 'random',
                waitComplete: false,
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#animatedPatternN0?version=0&activeId=0',
            nextRoute: '#animatedPatternN0?version=2&activeId=2',
            backRoute: '#canvas-overview',
        },
    },
    {
        animation: {
            fill: [
                0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96, 113,
                117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
            ],
            gutter: 1,
            numberOfColumn: 10,
            numberOfRow: 10,
            cellWidth: 50,
            cellHeight: 50,
            stagger: {
                each: 10,
                from: 'edges',
                waitComplete: false,
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#animatedPatternN0?version=1&activeId=1',
            nextRoute: '#animatedPatternN0?version=3&activeId=3',
            backRoute: '#canvas-overview',
        },
    },
    {
        title: 'Animated pattern N.0 v3',
        animation: {
            fill: [],
            gutter: 1,
            numberOfColumn: 12,
            numberOfRow: 13,
            cellWidth: 50,
            cellHeight: 50,
            stagger: {
                each: 20,
                from: { x: 6, y: 6 },
                grid: {
                    col: 13,
                    row: 13,
                    direction: 'radial',
                },
                waitComplete: false,
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#animatedPatternN0?version=2&activeId=2',
            nextRoute: '#animatedPatternN1',
            backRoute: '#canvas-overview',
        },
    },
];
