import { fromObject } from '@mobJs';
import { linksScroller } from './animation/links-scroller';
import { MobCore } from '@mobCore';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/**
 * @param {number} index
 * @returns {string}
 */
const getCounter = (index) => (index < 10 ? `0${index}` : `${index}`);

/**
 * @param {number} index
 * @returns {string}
 */
const getItemClass = (index) => {
    return `link index-${index} ${index % 2 ? 'is-odd' : 'is-even'} `;
};

/** @type {MobComponent<import('./type').LayoutLinks>} */
export const LayoutLinksFn = ({
    setRef,
    getRef,
    onMount,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let refresh = () => {};

    onMount(() => {
        const { screenElement, scrollerElement } = getRef();
        ({ destroy, refresh } = linksScroller({
            screenElement,
            scrollerElement,
            hideControls: (value) => {
                proxi.showControls = value;
            },
        }));

        /**
         * Update scroller dimensione ( when nom items is < window.innerWidth ).
         */
        MobCore.useNextLoop(() => {
            refresh();
        });

        /**
         * Stagger start later, so show path in background later.
         */
        setTimeout(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        }, 500);

        return () => {
            destroy();
            destroy = () => {};
            refresh = () => {};
        };
    });

    return fromObject({
        className: 'l-links',
        content: [
            {
                className: 'top',
                content: {
                    className: 'top-title',
                    modules: bindEffect({
                        toggleClass: {
                            'is-visible': () => proxi.isMounted,
                        },
                    }),
                    content: proxi.title,
                },
            },
            {
                className: 'grid',
                content: [
                    {
                        className: 'grid-item',
                        modules: setRef('screenElement'),
                        content: [
                            {
                                className: 'grid-bottom',
                                modules: bindEffect({
                                    toggleClass: {
                                        active: () => proxi.isMounted,
                                    },
                                }),
                            },
                            {
                                className: 'title',
                                modules: bindEffect({
                                    toggleClass: {
                                        'is-visible': () => proxi.isMounted,
                                    },
                                }),
                                content: {
                                    tag: 'h1',
                                    className: 'title-big',
                                    content: proxi.title,
                                },
                            },
                            {
                                className: 'scrollable-element',
                                modules: [
                                    setRef('scrollerElement'),
                                    bindEffect({
                                        toggleClass: {
                                            'use-drag-cursor': () =>
                                                proxi.showControls,
                                        },
                                    }),
                                ],
                                content: {
                                    tag: 'ul',
                                    className: 'items',
                                    content: proxi.items.map((item, index) => {
                                        return fromObject({
                                            tag: 'li',
                                            className: 'item',
                                            content: {
                                                tag: 'a',
                                                className: getItemClass(index),
                                                attributes: {
                                                    href: item.url,
                                                },
                                                modules: bindEffect({
                                                    toggleClass: {
                                                        active: () =>
                                                            proxi.isMounted,
                                                    },
                                                }),
                                                content: [
                                                    {
                                                        tag: 'span',
                                                        className: `counter index-${index}`,
                                                        content:
                                                            getCounter(index),
                                                    },
                                                    {
                                                        tag: 'span',
                                                        className: `index-${index}`,
                                                        content: item.title,
                                                    },
                                                ],
                                            },
                                        });
                                    }),
                                },
                            },
                        ],
                    },
                    {
                        tag: 'h6',
                        className: 'scroll-label',
                        modules: bindEffect({
                            toggleClass: {
                                active: () => proxi.showControls,
                            },
                        }),
                        content: 'Scroll or drag',
                    },
                ],
            },
        ],
    });
};
