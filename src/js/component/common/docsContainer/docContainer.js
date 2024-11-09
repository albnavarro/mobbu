//@ts-check

/**
 * @import { MobComponent, SetStateByName } from '../../../mobjs/type';
 * @import { MLogo1 } from '../mLogo1/type';
 * @import { ScrollToTop } from '../scrollToTop/type';
 **/

import { setStateByName } from '../../../mobjs';
import { hideFooterShape, showFooterShape } from '../shapes/shapUtils';

/** @type {MobComponent} */
export const DocContainerFn = ({ html, onMount }) => {
    /** @type {SetStateByName<MLogo1>} */
    const setLogoState = setStateByName('m1_logo');

    /** @type {SetStateByName<ScrollToTop>} */
    const setToTopState = setStateByName('scroll-to-top');

    onMount(() => {
        setLogoState('active', true);
        setToTopState('active', true);
        hideFooterShape();

        return () => {
            setLogoState('active', false);
            setToTopState('active', false);
            showFooterShape();
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
