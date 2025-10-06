export const scrollerParams = [
    {
        animation: {},
        description:
            '<strong>Canvas</strong>: ScrollTrigger & createStagger v0',
        nav: {
            prevRoute: '#animatedPatternN1',
            nextRoute: '#scrollerN0?version=1&activeId=1',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: ScrollTrigger & createStagger v1',
        animation: {
            stagger: {
                type: 'end',
                each: 1,
                from: { x: 0, y: 0 },
                grid: { col: 11, row: 10, direction: 'radial' },
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#scrollerN0?version=0&activeId=0',
            nextRoute: '#scrollerN0?version=2&activeId=2',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: ScrollTrigger & createStagger v2',
        animation: {
            stagger: {
                type: 'equal',
                each: 7,
                from: 'center',
                grid: { col: 11, row: 10, direction: 'col' },
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#scrollerN0?version=1&activeId=1',
            nextRoute: '#scrollerN0?version=3&activeId=3',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: ScrollTrigger & createStagger v3',
        animation: {
            stagger: {
                type: 'equal',
                each: 3,
                from: 'end',
                grid: { col: 11, row: 10, direction: 'row' },
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#scrollerN0?version=2&activeId=2',
            nextRoute: '#scrollerN0?version=4&activeId=4',
            backRoute: '#canvas-overview',
        },
    },
    {
        description:
            '<strong>Canvas</strong>: ScrollTrigger & createStagger v4',
        animation: {
            stagger: {
                type: 'equal',
                each: 2,
                from: 'end',
            },
            reorder: false,
        },
        nav: {
            prevRoute: '#scrollerN0?version=3&activeId=3',
            nextRoute: '#scrollerN1',
            backRoute: '#canvas-overview',
        },
    },
];
