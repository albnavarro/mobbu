/** @type {import('./type.js').GetLetteringMob} */
export const getLettering_mob = ({
    u0,
    u1,
    o,
    o_b,
    m1,
    m2,
    m3,
    m4,
    b1,
    b1_b,
    b2,
    b3,
    b4,
    b5,
    g1,
    sign,
    m1_b,
    m2_b,
    m3_b,
    m4_b,
    b1_stone,
    m1_stone,
    m2_stone,
}) => {
    return [
        {
            props: {
                id: 0,
                depth: 200,
                anchorPoint: 'center',
                classList: '',
                animate: true,
            },
            children: [
                {
                    props: {
                        id: 1,
                        depth: -500,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: u0,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 1,
                        depth: -50,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: u1,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 2,
                        depth: 20,
                        initialDepth: 0,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: o,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 2,
                        depth: 21,
                        initialDepth: 0,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: o_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 3,
                        depth: 150,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m1,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 3,
                        depth: 150,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m1_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 6,
                        depth: 155,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m4,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 6,
                        depth: 155,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m4_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 6,
                        depth: 170,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m1_stone,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 4,
                        depth: 180,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m2,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 4,
                        depth: 180,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m2_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 4,
                        depth: 180,
                        initialDepth: 1,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: sign,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 5,
                        depth: 100,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m3,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 5,
                        depth: 100,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m3_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 5,
                        depth: 100,
                        initialDepth: 5,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: m2_stone,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 6,
                        depth: 50,
                        anchorPoint: 'center',
                        initialDepth: 1,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b1,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 6,
                        depth: 51,
                        anchorPoint: 'center',
                        initialDepth: 1,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b1_b,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 7,
                        depth: 120,
                        anchorPoint: 'center',
                        initialDepth: 10,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b2,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 7,
                        depth: 120,
                        anchorPoint: 'center',
                        initialDepth: 10,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b1_stone,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 8,
                        depth: 100,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b3,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 10,
                        depth: 170,
                        anchorPoint: 'center',
                        initialDepth: 10,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b4,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 11,
                        depth: 100,
                        anchorPoint: 'center',
                        initialDepth: 1,
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: b5,
                            },
                        },
                    },
                    children: [],
                },
                {
                    props: {
                        id: 12,
                        initialDepth: 2,
                        depth: 102,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        rotate: 'y',
                        component: {
                            tagName: 'any-component',
                            className:
                                'u-any-center-svg l-lettering-mob__block',
                            props: {
                                content: g1,
                            },
                        },
                    },
                    children: [],
                },
            ],
        },
    ];
};
