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
        width: 40,
        height: 40,
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
    style: /* HTML */ ` ::slotted(div) { width: 100%; } `,
});
