/** @type {import('./type.js').GetLettering02} */
export const getLettering01 = ({
    letter_d,
    letter_p,
    letter_r,
    letter_r_shadow,
    letter_d_shadow,
    letter_p_shadow,
    letter_r_pieces,
    letter_d_pieces,
    letter_p_pieces,
    letter_r_fill,
    letter_d_fill,
    letter_p_fill,
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
                        depth: 100,
                        offsetX: -2,
                        offsetY: -2,
                        anchorPoint: 'center',
                        classList: '',
                        animate: true,
                        component: {
                            tagName: 'any-component',
                            className: 'u-any-center-svg l-lettering01__block',
                            props: {
                                content: letter_d,
                            },
                        },
                    },
                    children: [
                        {
                            props: {
                                id: 0,
                                depth: -10,
                                initialDepth: -1,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className:
                                        'u-any-center-svg l-lettering01__block',
                                    props: {
                                        content: letter_d_shadow,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: 20,
                                anchorPoint: 'center',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className:
                                        'u-any-center-svg l-lettering01__block',
                                    props: {
                                        content: letter_d_pieces,
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
                                    className:
                                        'u-any-center-svg l-lettering01__block',
                                    props: {
                                        content: letter_d_fill,
                                    },
                                },
                            },
                            children: [],
                        },
                        {
                            props: {
                                id: 0,
                                depth: -100,
                                offsetX: -10,
                                anchorPoint: 'right',
                                rotate: 'y',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className:
                                        'u-any-center-svg l-lettering01__block',
                                    props: {
                                        content: letter_r,
                                    },
                                },
                            },
                            children: [
                                {
                                    props: {
                                        id: 0,
                                        depth: -10,
                                        initialDepth: -1,
                                        anchorPoint: 'center',
                                        rotate: 'y',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_r_shadow,
                                            },
                                        },
                                    },
                                    children: [],
                                },
                                {
                                    props: {
                                        id: 0,
                                        depth: 20,
                                        anchorPoint: 'center',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_r_pieces,
                                            },
                                        },
                                    },
                                    children: [],
                                },
                                {
                                    props: {
                                        id: 0,
                                        depth: 30,
                                        anchorPoint: 'center',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_r_fill,
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
                                anchorPoint: 'right',
                                classList: '',
                                animate: true,
                                component: {
                                    tagName: 'any-component',
                                    className:
                                        'u-any-center-svg l-lettering01__block',
                                    props: {
                                        content: letter_p,
                                    },
                                },
                            },
                            children: [
                                {
                                    props: {
                                        id: 0,
                                        depth: -10,
                                        initialDepth: -1,
                                        anchorPoint: 'center',
                                        rotate: 'y',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_p_shadow,
                                            },
                                        },
                                    },
                                    children: [],
                                },
                                {
                                    props: {
                                        id: 0,
                                        depth: 20,
                                        anchorPoint: 'center',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_p_pieces,
                                            },
                                        },
                                    },
                                    children: [],
                                },
                                {
                                    props: {
                                        id: 0,
                                        depth: 30,
                                        anchorPoint: 'center',
                                        classList: '',
                                        animate: true,
                                        component: {
                                            tagName: 'any-component',
                                            className:
                                                'u-any-center-svg l-lettering01__block',
                                            props: {
                                                content: letter_p_fill,
                                            },
                                        },
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
};
