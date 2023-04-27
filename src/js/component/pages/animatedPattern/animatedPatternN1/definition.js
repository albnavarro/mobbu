import { AnimatedPatternN1 } from './animatedPatternN1';

export const animatedPatternN1Def = {
    AnimatedPatternN1: {
        componentFunction: AnimatedPatternN1,
        componentParams: {
            props: {
                numerOfRow: 10,
                numberOfColumn: 10,
                cellWidth: 50,
                cellHeight: 50,
                gutter: 10,
                fill: '#fff',
                stroke: '#999',
            },
        },
    },
};
