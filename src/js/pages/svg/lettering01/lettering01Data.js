/** @returns{import("../../../component/common/Move3D/type").Move3DChildren[]} */
export const getLettering01 = ({
    letter_o,
    letter_o_oultine,
    letter_o_star,
    letter_m,
    letter_m_outline,
    letter_m_over,
    letter_m_star,
    letter_m_star_top,
    letter_b,
    letter_b_outline,
    letter_b_over,
    letter_b_star,
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
                                        content: letter_m_outline,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 80,
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
                                depth: 200,
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
                                depth: 40,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_o_oultine,
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
                                depth: 50,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className: 'u-any-center-svg',
                                    props: {
                                        content: letter_b_outline,
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
