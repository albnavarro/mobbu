/** @type {import('./type.d.ts').GetLettering01} */
export const getLettering01 = ({
    letter_o,
    letter_o_star,
    letter_m,
    letter_m_over,
    letter_m_star,
    letter_m_star_top,
    letter_b,
    letter_b_over,
    letter_b_star,
    letter_m_shadow,
    letter_b_shadow,
    letter_o_shadow,
    letter_o_pieces,
    letter_m_pieces,
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
                        id: 0,
                        depth: -100,
                        offsetX: -8,
                        anchorPoint: 'right',
                        rotate: 'y',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className: 'u-any-center-svg',
                            props: {
                                content: letter_m,
                            },
                        },
                    },
                    children: [
                        {
                            props: {
                                id: 0,
                                depth: 50,
                                anchorPoint: 'center',
                                rotate: 'y',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_m_pieces,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: -150,
                                anchorPoint: 'center',
                                rotate: 'y',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_m_shadow,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 200,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_m_star,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 100,
                                anchorPoint: 'center',
                                rotate: 'y',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_m_over,
                                    },
                                },
                            },
                            children: [],
                        },
                    ],
                },
                {
                    props: {
                        id: 0,
                        depth: 200,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className: 'u-any-center-svg',
                            props: {
                                content: letter_o,
                            },
                        },
                    },
                    children: [
                        {
                            props: {
                                id: 0,
                                depth: 60,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_o_pieces,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: -100,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_o_shadow,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: -50,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_o_shadow,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: -100,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_o_star,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 100,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_m_star_top,
                                    },
                                },
                            },
                            children: [],
                        },
                    ],
                },
                {
                    props: {
                        id: 0,
                        depth: -100,
                        offsetX: -10,
                        anchorPoint: 'left',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className: 'u-any-center-svg',
                            props: {
                                content: letter_b,
                            },
                        },
                    },
                    children: [
                        {
                            props: {
                                id: 0,
                                depth: -150,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_b_shadow,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 100,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_b_over,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 100,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_b_star,
                                    },
                                },
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
    ];
};
