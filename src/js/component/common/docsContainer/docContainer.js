import { getIdByInstanceName, setStateById } from '../../../mobjs';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocContainer = ({ html, onMount }) => {
    onMount(() => {
        window.scrollTo(0, 0);

        /**
         * Show side logo.
         */
        const logoM1Id = getIdByInstanceName('m1_logo');
        setStateById(logoM1Id, 'active', true);

        return () => {
            /**
             * Hide side logo.
             */
            setStateById(logoM1Id, 'active', false);
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
