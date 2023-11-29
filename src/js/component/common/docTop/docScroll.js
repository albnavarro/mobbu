import { bodyScroll } from '../../../mobMotion/plugin';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocTop = ({ html, delegateEvents }) => {
    return html`
        <div
            class="c-doc-top"
            ${delegateEvents({
                click: () => bodyScroll.to(0, { duration: 2000 }),
            })}
        ></div>
    `;
};
