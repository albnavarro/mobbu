export const animatedPatternN0Params = [
    {
        animation: {},
        description:
            '<strong>Canvas</strong>: AsyncTimeline - Animated pattern v0',
        nav: {
            prevRoute: '#async-timeline',
            nextRoute: '#animatedPatternN0?version=1&activeId=1',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: AsyncTimeline - Animated pattern v1',
        animation: {
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
        nav: {
            prevRoute: '#animatedPatternN0?version=0&activeId=0',
            nextRoute: '#animatedPatternN0?version=2&activeId=2',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: AsyncTimeline - Animated pattern v2',
        animation: {
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
        nav: {
            prevRoute: '#animatedPatternN0?version=1&activeId=1',
            nextRoute: '#animatedPatternN0?version=3&activeId=3',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: AsyncTimeline - Animated pattern v3',
        animation: {
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
        nav: {
            prevRoute: '#animatedPatternN0?version=2&activeId=2',
            nextRoute: '#animatedPatternN1',
            backRoute: '#canvas-overview',
        },
    },
];
