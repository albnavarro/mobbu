import { html } from '@mobJs';
import { draggerAnimation } from './animation';

/** @type {import('@mobJsType').MobComponent<import('./type').Dragger>} */
export const DraggerFn = ({
    getProxi,
    setRef,
    getRef,
    bindEffect,
    onMount,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const { child } = getRef();
        let firstChild = child.firstChild;
        if (!firstChild) return;

        /**
         * Create dragger animation
         */
        const methods = draggerAnimation({
            align: proxi.align,
            root: element,
            child: /** @type {HTMLElement} */ (firstChild),
            usePrespective: proxi.usePrespective,
            perspective: proxi.perspective,
            maxLowDepth: proxi.maxLowDepth,
            maxHightDepth: proxi.maxHightDepth,
            onDepthChange: proxi.onDepthChange,
        });

        /**
         * Callback after init
         */
        proxi.afterInit({ root: element });

        return () => {
            methods.destroy();

            /**
             * Remove reference.
             */
            firstChild = null;
        };
    });

    return html`<div class="c-dragger ${proxi.rootClass}">
        <!-- Root border -->
        <mobjs-slot name="root-slot"></mobjs-slot>

        <!-- Child -->
        <div
            class="c-dragger__wrapper ${proxi.childClass}"
            ${setRef('child')}
            ${bindEffect({
                toggleStyle: {
                    perspective: () => `${proxi.perspective}px`,
                },
            })}
        >
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`;
};
