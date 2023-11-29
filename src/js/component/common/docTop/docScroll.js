import { bodyScroll } from '../../../mobMotion/plugin';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocTop = ({ html, onMount, delegateEvents }) => {
    onMount(() => {});

    return html`
        <div
            class="c-doc-top"
            ${delegateEvents({
                click: () => bodyScroll.to(0),
            })}
        ></div>
    `;
};
