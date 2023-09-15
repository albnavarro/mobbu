import { createComponent } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN0 } from './caterpillarN0';

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
    attributeToObserve: ['data-test'],
    connectedCallback: ({ context, id }) => {
        console.log('connectedCallback', context, id);
    },
    disconnectedCallback: ({ context, id }) => {
        console.log('disconnectedCallback', context, id);
    },
    adoptedCallback: ({ context, id }) => {
        console.log('adoptedCallback', context, id);
    },
    attributeChangedCallback: ({ name, oldValue, newValue, context, id }) => {
        console.log(
            'attributeChangedCallback',
            name,
            oldValue,
            newValue,
            context,
            id
        );
    },
});
