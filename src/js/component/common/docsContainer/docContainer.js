//@ts-check

/**
 * @import { MobComponent, SetStateByName } from '../../../mobjs/type';
 * @import { MLogo1 } from '../mLogo1/type';
 * @import { ScrollToTop } from '../scrollToTop/type';
 **/

import { setStateByName, useMethodByName } from '../../../mobjs';

/** @type {MobComponent} */
export const DocContainerFn = ({ html, onMount }) => {
    /** @type {SetStateByName<MLogo1>} */
    const setLogoState = setStateByName('m1_logo');

    /** @type {SetStateByName<ScrollToTop>} */
    const setToTopState = setStateByName('scroll-to-top');

    onMount(() => {
        setLogoState('active', true);
        setToTopState('active', true);
        useMethodByName('footer_shape_left')?.setPosition({ position: 'side' });
        useMethodByName('footer_shape_right')?.setPosition({
            position: 'side',
        });

        return () => {
            setLogoState('active', false);
            setToTopState('active', false);

            useMethodByName('footer_shape_left')?.setPosition({
                position: 'center',
            });

            useMethodByName('footer_shape_right')?.setPosition({
                position: 'center',
            });
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
