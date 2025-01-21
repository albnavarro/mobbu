/** @returns{import("../../../component/common/Move3D/type").Move3DChildren[]} */
export const getLettering01 = ({
    letter_o,
    letter_o_oultine,
    letter_o_star,
}) => {
    return [
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
                        depth: 40,
                        offsetY: -5,
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
                        depth: -20,
                        offsetY: -5,
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
            ],
        },
    ];
};
