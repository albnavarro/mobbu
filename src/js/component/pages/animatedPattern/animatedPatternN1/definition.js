import { AnimatedPatternN1 } from './animatedPatternN1';

export const animatedPatternN1Def = {
    AnimatedPatternN1: {
        componentFunction: AnimatedPatternN1,
        componentParams: {
            props: {
                numberOfRow: 7,
                numberOfColumn: 15,
                cellWidth: 70,
                cellHeight: 70,
                gutter: 10,
                fill: '#fff',
                stroke: '#999',
                disableOffcanvas: false,
            },
        },
    },
};
