//@ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @type {import('../../../mobjs/type').mobComponent}
 */
export const DocContainerFn = ({ html, onMount }) => {
    /**
     * @type {import('../../../mobjs/type').SetStateByName<import('../mLogo1/type').MLogo1>}
     */
    const setLogoState = setStateByName('m1_logo');

    onMount(() => {
        setLogoState('active', true);

        return () => {
            setLogoState('active', false);
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
