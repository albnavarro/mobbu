import { Triangles } from '../../common/scrollToTop/triangles';
import { linksScroller } from './animation/linksScroller';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').LayoutLinks>} */
export const LayoutLinksFn = ({
    html,
    getState,
    setState,
    setRef,
    getRef,
    onMount,
    bindEffect,
}) => {
    const { title, items } = getState();

    onMount(() => {
        const { screenElement, scrollerElement } = getRef();
        const { destroy } = linksScroller({
            screenElement,
            scrollerElement,
            hideControls: (value) => {
                setState('showControls', value);
            },
        });

        /**
         * Stagger start later, so show path in background later.
         */
        setTimeout(() => {
            setState('isMounted', true);
        }, 500);

        return () => {
            destroy();
        };
    });

    return html`<div class="l-links">
        <div class="l-links__triangle-1">${Triangles}</div>
        <div class="l-links__triangle-2">${Triangles}</div>
        <span
            class="l-links__arrow"
            ${bindEffect({
                bind: 'showControls',
                toggleClass: {
                    active: () => getState().showControls,
                },
            })}
        ></span>
        <div
            class="l-links__back-title is-white"
            ${bindEffect({
                bind: 'isMounted',
                toggleClass: {
                    'is-visible': () => getState().isMounted,
                },
            })}
        >
            ${title}
        </div>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row" ${setRef('screenElement')}>
                <div class="l-links__title">
                    <h1 class="title-big">${title}</h1>
                </div>
                <div
                    class="l-links__scroller"
                    ${setRef('scrollerElement')}
                    ${bindEffect({
                        bind: 'showControls',
                        toggleClass: {
                            'use-drag-cursor': () => getState().showControls,
                        },
                    })}
                >
                    <ul class="l-links__list">
                        ${items
                            .map((item) => {
                                return /* HTML */ `
                                    <li class="l-links__list__item">
                                        <a
                                            class="l-links__list__link"
                                            href="${item.url}"
                                        >
                                            <h6>${item.title}</h6>
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
                    bind: 'showControls',
                    toggleClass: {
                        active: () => getState().showControls,
                    },
                })}
            >
                Scroll or drag
            </h6>
        </div>
    </div>`;
};
