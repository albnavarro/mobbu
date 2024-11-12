//@ts-check

/** @type{import("../type").Move3DChildren[]} */
export const move3DShape1 = [
    {
        props: {
            depth: 0,
            rotate: 'x',
            range: 20,
            anchorPoint: 'bottom',
            animate: true,
        },
        children: [
            {
                props: {
                    depth: 0,
                    rotate: 'x',
                    range: 30,
                    anchorPoint: 'bottom',
                    animate: true,
                },
                children: [],
            },
        ],
    },
    {
        props: {
            depth: 0,
            rotate: 'x',
            range: 20,
            anchorPoint: 'top',
            animate: true,
        },
        children: [
            {
                props: {
                    depth: 0,
                    rotate: 'x',
                    range: 20,
                    anchorPoint: 'top',
                    animate: true,
                },
                children: [],
            },
        ],
    },
    {
        props: {
            depth: 0,
            rotate: 'y',
            range: 20,
            anchorPoint: 'left',
            animate: true,
        },
        children: [
            {
                props: {
                    depth: 0,
                    rotate: 'y',
                    range: 30,
                    anchorPoint: 'left',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            depth: 0,
                            rotate: 'y',
                            range: 40,
                            anchorPoint: 'left',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        props: {
            depth: 0,
            rotate: 'y',
            range: 20,
            anchorPoint: 'right',
            animate: true,
        },
        children: [
            {
                props: {
                    depth: 0,
                    rotate: 'y',
                    range: 30,
                    anchorPoint: 'right',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            depth: 0,
                            rotate: 'y',
                            range: 40,
                            anchorPoint: 'right',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        props: {
            depth: 0,
            rotate: 'xy',
            range: 20,
            anchorPoint: 'bottom-left',
            animate: true,
        },
        children: [
            {
                props: {
                    depth: 0,
                    rotate: 'xy',
                    range: 30,
                    anchorPoint: 'bottom-left',
                    animate: true,
                },
                children: [],
            },
        ],
    },
    {
        props: {
            depth: 0,
            rotate: 'xy',
            range: 20,
            anchorPoint: 'bottom-right',
            animate: true,
        },
        children: [],
    },
    {
        props: {
            depth: 0,
            rotate: 'xy',
            range: 20,
            anchorPoint: 'top-left',
            animate: true,
        },
        children: [],
    },
    {
        props: {
            depth: 0,
            rotate: 'xy',
            range: 20,
            anchorPoint: 'top-right',
            animate: true,
        },
        children: [],
    },
];
