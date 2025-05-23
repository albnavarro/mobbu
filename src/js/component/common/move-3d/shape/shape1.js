import { createUnit3D } from '../utils';

const { get3dItemUnit } = createUnit3D({ ratio: 1980 });

/** @type {import('../type').Move3DChildren[]} */
export const move3DShape1 = [
    {
        props: {
            id: 0,
            depth: 0,
            anchorPoint: 'center',
            classList: 'move3d-square',
            animate: true,
            width: get3dItemUnit(150),
            height: get3dItemUnit(150),
        },
        children: [
            {
                props: {
                    id: 1,
                    depth: 200,
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    rotate: '',
                    anchorPoint: 'center',
                    initialDepth: 100,
                    classList: 'move3d-square has-star pippo',
                    component: {
                        tagName: 'svg-star',
                        className: 'move3d-square__star',
                        props: {
                            fill: '#f28f3b',
                        },
                    },
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 2,
                    depth: 200,
                    width: get3dItemUnit(80),
                    height: get3dItemUnit(80),
                    offsetX: get3dItemUnit(40),
                    offsetY: get3dItemUnit(40),
                    rotate: '',
                    initialDepth: 200,
                    anchorPoint: 'center',
                    classList: 'move3d-square is-small is-white is-center',
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 3,
                    depth: 200,
                    width: get3dItemUnit(80),
                    height: get3dItemUnit(80),
                    offsetX: get3dItemUnit(-10),
                    offsetY: get3dItemUnit(80),
                    rotate: '',
                    initialDepth: 50,
                    anchorPoint: 'center',
                    classList: 'move3d-square is-small is-white is-center',
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 4,
                    depth: 200,
                    width: get3dItemUnit(80),
                    height: get3dItemUnit(80),
                    offsetX: get3dItemUnit(80),
                    offsetY: get3dItemUnit(80),
                    rotate: '',
                    initialDepth: 50,
                    anchorPoint: 'center',
                    classList: 'move3d-square is-small is-white is-center',
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 5,
                    depth: 200,
                    width: get3dItemUnit(80),
                    height: get3dItemUnit(80),
                    offsetX: get3dItemUnit(-10),
                    offsetY: get3dItemUnit(-10),
                    rotate: '',
                    initialDepth: 50,
                    anchorPoint: 'center',
                    classList: 'move3d-square is-small is-white is-center',
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 6,
                    depth: 200,
                    width: get3dItemUnit(80),
                    height: get3dItemUnit(80),
                    offsetX: get3dItemUnit(80),
                    offsetY: get3dItemUnit(-10),
                    rotate: '',
                    initialDepth: 50,
                    anchorPoint: 'center',
                    classList: 'move3d-square is-small is-white is-center',
                    animate: true,
                },
                children: [],
            },
            {
                props: {
                    id: 7,
                    depth: 100,
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    rotate: 'x',
                    range: 20,
                    anchorPoint: 'bottom',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 8,
                            depth: 0,
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            rotate: 'x',
                            range: 30,
                            anchorPoint: 'bottom',
                            classList: 'move3d-square',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
            {
                props: {
                    id: 9,
                    depth: 100,
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    rotate: 'x',
                    range: 20,
                    anchorPoint: 'top',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 10,
                            depth: 0,
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            rotate: 'x',
                            range: 20,
                            anchorPoint: 'top',
                            classList: 'move3d-square',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
            {
                props: {
                    id: 11,
                    depth: 100,
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    rotate: 'y',
                    range: 20,
                    anchorPoint: 'left',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 12,
                            depth: 0,
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            rotate: 'y',
                            range: 30,
                            anchorPoint: 'left',
                            classList: 'move3d-square',
                            animate: true,
                        },
                        children: [
                            {
                                props: {
                                    id: 13,
                                    depth: 0,
                                    width: get3dItemUnit(150),
                                    height: get3dItemUnit(150),
                                    rotate: 'y',
                                    range: 40,
                                    anchorPoint: 'left',
                                    classList: 'move3d-square',
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
                    id: 13,
                    depth: 100,
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    rotate: 'y',
                    range: 20,
                    anchorPoint: 'right',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 14,
                            depth: 0,
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            rotate: 'y',
                            range: 30,
                            anchorPoint: 'right',
                            classList: 'move3d-square',
                            animate: true,
                        },
                        children: [
                            {
                                props: {
                                    id: 15,
                                    depth: 0,
                                    width: get3dItemUnit(150),
                                    height: get3dItemUnit(150),
                                    rotate: 'y',
                                    range: 40,
                                    anchorPoint: 'right',
                                    classList: 'move3d-square',
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
                    id: 16,
                    depth: 150,
                    rotate: 'xy',
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    offsetX: get3dItemUnit(20),
                    offsetY: get3dItemUnit(20),
                    range: 20,
                    anchorPoint: 'bottom-left',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 17,
                            depth: 100,
                            rotate: '',
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            range: 100,
                            anchorPoint: 'center',
                            classList:
                                'move3d-square is-small is-white is-center',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
            {
                props: {
                    id: 18,
                    depth: 150,
                    rotate: 'xy',
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    offsetX: get3dItemUnit(20),
                    offsetY: get3dItemUnit(20),
                    range: 20,
                    anchorPoint: 'bottom-right',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 19,
                            depth: 100,
                            rotate: '',
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            range: 100,
                            anchorPoint: 'center',
                            classList:
                                'move3d-square is-small is-white is-center',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
            {
                props: {
                    id: 20,
                    depth: 150,
                    rotate: 'xy',
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    offsetX: get3dItemUnit(20),
                    offsetY: get3dItemUnit(20),
                    range: 20,
                    anchorPoint: 'top-left',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 21,
                            depth: 100,
                            rotate: '',
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            range: 100,
                            anchorPoint: 'center',
                            classList:
                                'move3d-square is-small is-white is-center',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
            {
                props: {
                    id: 22,
                    depth: 150,
                    rotate: 'xy',
                    width: get3dItemUnit(150),
                    height: get3dItemUnit(150),
                    offsetX: get3dItemUnit(20),
                    offsetY: get3dItemUnit(20),
                    range: 20,
                    anchorPoint: 'top-right',
                    classList: 'move3d-square',
                    animate: true,
                },
                children: [
                    {
                        props: {
                            id: 23,
                            depth: 100,
                            rotate: '',
                            width: get3dItemUnit(150),
                            height: get3dItemUnit(150),
                            range: 100,
                            anchorPoint: 'center',
                            classList:
                                'move3d-square is-small is-white is-center',
                            animate: true,
                        },
                        children: [],
                    },
                ],
            },
        ],
    },
];
