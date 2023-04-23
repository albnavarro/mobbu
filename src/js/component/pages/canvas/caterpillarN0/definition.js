import { CaterpillarN0 } from './caterpillarSvg';

export const caterpillarN0Def = {
    CaterpillarN0: {
        componentFunction: CaterpillarN0,
        componentParams: {
            props: {
                amountOfPath: 17,
                width: 30,
                height: 30,
                radius: 100,
                fill: '#ffffff',
                stroke: '#000',
                opacity: 0.05,
                spacerY: (condition) => (condition ? 200 : -400),
                intialRotation: 33,
                perpetualRatio: 6,
                mouseMoveRatio: 10,
            },
        },
    },
};
