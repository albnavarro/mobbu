import { detectFirefox } from '../../../../utils/utils';
import { CaterpillarN0 } from './caterpillarN0';

export const caterpillarN0Def = {
    CaterpillarN0: {
        componentFunction: CaterpillarN0,
        componentParams: {
            props: {
                amountOfPath: 17,
                width: 30,
                height: 30,
                radius: 100,
                fill: '',
                stroke: '#fff',
                opacity: 0.05,
                spacerY: (condition) => (condition ? 200 : -400),
                intialRotation: 33,
                perpetualRatio: 6,
                mouseMoveRatio: 10,
                disableOffcanvas: detectFirefox() ? true : false,
            },
        },
    },
};
