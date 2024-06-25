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

        /**
         * @type {import('../../../mobjs/type').Union<import('./type').animationTitle>}
         */
        setState('title', 2);

        watchSync('align', (value) => {
            titleEl.innerHTML = value;
        });

        /**
         * @type {import('./type').Union<import('./type').DumpRecord>}
         */
        const one = {
            key: 'arr',
            render: (value, row) => {
                value;
            },
        };

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
