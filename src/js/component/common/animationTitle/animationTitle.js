//@ts-check
import { mobCore } from '../../../mobCore';
import { motionCore } from '../../../mobMotion';

/**
 * @type {import('../../../mobjs/type').mobComponent<import('./type').animationTitle>}
 */
export const AnimationTitleFn = ({
    html,
    onMount,
    watchSync,
    setState,
    getState,
}) => {
    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { titleEl } = refs;

        const { title } = getState();

        watchSync('align', (value) => {
            element.classList.remove('is-left');
            element.classList.remove('is-right');
            element.classList.add(`is-${value}`);
        });

        setState('title', 2);

        /**
         * @type {import('./type').setState<import('./type').animationTitle>}
         */
        const setState2 = (prop, value) => {
            console.log(prop, value);
        };

        setState2('align', true);

        // const test = {
        //     key: 'arr',
        //     render: (value, row) => {
        //         value;
        //     },
        // };

        watchSync('align', (value) => {
            titleEl.innerHTML = value;
        });

        watchSync('color', (value) => {
            titleEl.classList.remove('is-white');
            titleEl.classList.remove('is-black');
            titleEl.classList.remove('is-highlight');
            titleEl.classList.add(`is-${value}`);
        });

        mobCore.useFrame(() => {
            titleEl.classList.add('visible');
        });
    });

    return html`<div class="c-animation-title">
        <h4 ref="titleEl"></h4>
    </div>`;
};
