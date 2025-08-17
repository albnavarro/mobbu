//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {AnimationTitle} from './type';
 */

import { html } from '@mobJs';

/** @type {MobComponent<AnimationTitle>} */
export const AnimationTitleFn = ({ getState }) => {
    const { title, list } = getState();
    const listParsed = list ?? [];

    return html`
        <div>
            <div class="c-animation-title">
                <ul class="c-animation-title__list">
                    ${listParsed
                        .map((item) => {
                            return html`<li class="c-animation-title__item">
                                <h6>${item}</h6>
                            </li>`;
                        })
                        .join('')}
                </ul>
                <h2 class="c-animation-title__mail">${title}</h2>
            </div>
        </div>
    `;
};
