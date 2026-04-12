import { fromObject } from '@mobJs';
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
        let { child } = getRef();
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
            depthFactor: proxi.depthFactor,
            onDepthChange: proxi.onDepthChange,
            containerClass: proxi.containerClass,
            childrenClass: proxi.childrenClass,
            hideThreshold: proxi.hideThreshold,
        });

        /**
         * Callback after init
         */
        proxi.afterInit({ root: element });

        return () => {
            methods.destroy();
            element.remove();
            child.remove();

            // @ts-ignore
            child = null;
            firstChild = null;

            // @ts-ignore
            element = null;
        };
    });

    return fromObject({
        className: ['c-dragger', proxi.rootClass ?? ''],
        content: [
            /**
             * Root border
             */
            {
                tag: 'mobjs-slot',
                attributes: { name: 'root-slot' },
            },

            /**
             * Root border
             */
            {
                className: 'wrapper',
                modules: [
                    setRef('child'),
                    bindEffect({
                        toggleStyle: {
                            perspective: () => `${proxi.perspective}px`,
                        },
                    }),
                ],
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'child-slot' },
                },
            },
        ],
    });
};
