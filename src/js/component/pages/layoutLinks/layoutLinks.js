import { Triangles } from '../../common/scrollToTop/triangles';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').LayoutLinks>} */
export const LayoutLinksFn = ({ html, getState }) => {
    const { title, items } = getState();

    return html`<div class="l-links">
        <div class="l-links__triangle-1">${Triangles}</div>
        <div class="l-links__triangle-2">${Triangles}</div>
        <span class="l-links__arrow"></span>
        <div class="l-links__grid">
            <div class="l-links__row l-links__row--top">
                <h1 class="title-big">${title}</h1>
            </div>
            <div class="l-links__row l-links__row--bottom">
                <div class="l-links__scroller">
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
        </div>
    </div>`;
};
