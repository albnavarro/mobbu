//@ts-check

import { html, MobJs } from '../../../mob/mobjs';

/**
 * @import { MobComponent, SetStateByName } from '../../../mob/mobjs/type';
 * @import { ScrollToTop } from '../scrollToTop/type';
 **/

/** @type {MobComponent} */
export const DocContainerFn = ({ onMount }) => {
    /** @type {SetStateByName<ScrollToTop>} */
    const setToTopState = MobJs.setStateByName('scroll-to-top');

    onMount(() => {
        setToTopState('active', true);

        return () => {
            setToTopState('active', false);
        };
    });

    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;
};
