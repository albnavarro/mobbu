import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { CaterpillarN0Fn } from './caterpillarN0';

export const CaterpillarN0 = createComponent({
    name: 'caterpillar-n0',
    component: CaterpillarN0Fn,
    exportState: [
        'nextRoute',
        'prevRoute',
        'amountOfPath',
        'width',
        'height',
        'radius',
        'fill',
        'stroke',
        'opacity',
        'spacerY',
        'intialRotation',
        'perpetualRatio',
        'mouseMoveRatio',
        'disableOffcanvas',
    ],
    state: {
        nextRoute: () => ({
            value: '',
            type: String,
        }),
        prevRoute: () => ({
            value: '',
            type: String,
        }),
        amountOfPath: 17,
        width: 30,
        height: 30,
        radius: 0,
        fill: '',
        stroke: '#fff',
        opacity: 0.05,
        spacerY: (condition) => (condition ? 300 : -400),
        intialRotation: 33,
        perpetualRatio: 6,
        mouseMoveRatio: 10,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
    child: [OnlyDesktop],
});
