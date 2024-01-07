export const scrollerParams = [
    {
        title: 'Scroller N.0 v0',
        animation: {},
        nav: {
            prevRoute: '#animatedPatternN1',
            nextRoute: '#scrollerN0?version=1&activeId=1',
        },
    },
    {
        title: 'Scroller N.0 v1',
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
        },
    },
    {
        title: 'Scroller N.0 v2',
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
        },
    },
    {
        title: 'Scroller N.0 v3',
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
        },
    },
    {
        title: 'Scroller N.0 v4',
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
        },
    },
];
