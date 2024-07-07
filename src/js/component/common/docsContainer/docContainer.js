//@ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @type {import('../../../mobjs/type').mobComponent}
 */
export const DocContainerFn = ({ html, onMount }) => {
    onMount(() => {
        /**
         * Show side logo.
         */
        setStateByName('m1_logo', 'active', true);

        return () => {
            /**
             * Hide side logo.
             */
            setStateByName('m1_logo', 'active', false);
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
