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
    watch,
    setState,
    emit,
    emitAsync,
    computed,
    freezeProp,
    unBind,
    getState,
}) => {
    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { titleEl } = refs;

        setState('pippo', true);
        const { pippo, align } = getState();

        emit('color');
        emitAsync('align');
        computed('pippo', ['align', 'color'], (align, color) => {
            return true;
        });
        watch('pippo', (value) => {
            //
        });
        freezeProp('align');
        unBind();

        watchSync('color', (value) => {
            element.classList.remove('is-left');
            element.classList.remove('is-right');
            element.classList.add(`is-${value}`);
        });

        watchSync('pippo', (value) => {
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
