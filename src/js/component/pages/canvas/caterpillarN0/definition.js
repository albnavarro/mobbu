import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN0 } from './caterpillarN0';
import style from './style.scss';

export const caterpillarN0Def = createComponent({
    name: 'caterpillar-n0',
    component: CaterpillarN0,
    isolateOnMount: true,
    isolateCreation: true,
    exportState: [
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
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    },
    attributeToObserve: ['class', 'data-test'],
    constructorCallback: ({ context }) => {
        console.log('constructorCallback', context);
    },
    connectedCallback: ({ context, data }) => {
        console.log('connectedCallback', context, data);
    },
    disconnectedCallback: ({ context, data }) => {
        console.log('disconnectedCallback', context, data);
    },
    adoptedCallback: ({ context, data }) => {
        console.log('adoptedCallback', context, data);
    },
    attributeChangedCallback: ({ name, oldValue, newValue, context, data }) => {
        console.log(
            'attributeChangedCallback',
            name,
            oldValue,
            newValue,
            context,
            data
        );
    },
    style,
});
