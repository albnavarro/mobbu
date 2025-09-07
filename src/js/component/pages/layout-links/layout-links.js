import { html } from '@mobJs';
import { linksScroller } from './animation/links-scroller';
import { MobCore } from '@mobCore';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/**
 * @param {number} index
 * @returns {string}
 */
const getCounter = (index) => (index < 10 ? `0${index}` : `${index}`);

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
            proxi.isMounted = true;
        }, 500);

        return () => {
            destroy();
            destroy = () => {};
            refresh = () => {};
        };
    });

    return html`<div class="l-links">
        <div class="l-links__under-container">
            <div
                class="l-links__under is-white"
                ${bindEffect({
                    toggleClass: {
                        'is-visible': () => proxi.isMounted,
                    },
                })}
            >
                ${proxi.title}
            </div>
        </div>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row" ${setRef('screenElement')}>
                <div class="l-links__row__white">
                    <h6 class="l-links__over is-black">${proxi.title}</h6>
                </div>
                <div class="l-links__title">
                    <h1 class="title-big">${proxi.title}</h1>
                </div>
                <div
                    class="l-links__scroller"
                    ${setRef('scrollerElement')}
                    ${bindEffect({
                        toggleClass: {
                            'use-drag-cursor': () => proxi.showControls,
                        },
                    })}
                >
                    <ul class="l-links__list">
                        ${proxi.items
                            .map((item, index) => {
                                return /* HTML */ `
                                    <li class="l-links__list__item">
                                        <a
                                            class="l-links__list__link"
                                            href="${item.url}"
                                        >
                                            <span class="l-links__list__counter"
                                                >${getCounter(index)}</span
                                            >
                                            <span>${item.title}</span>
                                        </a>
                                    </li>
                                `;
                            })
                            .join('')}
                    </ul>
                </div>
            </div>
            <h6
                class="l-links__scroll"
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
