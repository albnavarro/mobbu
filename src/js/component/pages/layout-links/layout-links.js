import { html } from '@mobJs';
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

    return html`<div class="l-links">
        <div class="top">
            <div
                class="top-title is-white"
                ${bindEffect({
                    toggleClass: {
                        'is-visible': () => proxi.isMounted,
                    },
                })}
            >
                ${proxi.title}
            </div>
        </div>
        <div class="grid">
            <div class="grid-item" ${setRef('screenElement')}>
                <div
                    class="grid-bottom"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.isMounted,
                        },
                    })}
                ></div>
                <div
                    class="title"
                    ${bindEffect({
                        toggleClass: {
                            'is-visible': () => proxi.isMounted,
                        },
                    })}
                >
                    <h1 class="title-big">${proxi.title}</h1>
                </div>
                <div
                    class="scrollable-element"
                    ${setRef('scrollerElement')}
                    ${bindEffect({
                        toggleClass: {
                            'use-drag-cursor': () => proxi.showControls,
                        },
                    })}
                >
                    <ul class="items">
                        ${proxi.items
                            .map((item, index) => {
                                return /* HTML */ `
                                    <li class="item">
                                        <a
                                            class="${getItemClass(index)}"
                                            href="${item.url}"
                                            ${bindEffect({
                                                toggleClass: {
                                                    active: () =>
                                                        proxi.isMounted,
                                                },
                                            })}
                                        >
                                            <span class="counter index-${index}"
                                                >${getCounter(index)}</span
                                            >
                                            <span class="index-${index}"
                                                >${item.title}</span
                                            >
                                        </a>
                                    </li>
                                `;
                            })
                            .join('')}
                    </ul>
                </div>
            </div>
            <h6
                class="scroll-label"
                ${bindEffect({
                    toggleClass: {
                        active: () => proxi.showControls,
                    },
                })}
            >
                Scroll or drag
            </h6>
        </div>
    </div>`;
};
