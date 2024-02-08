import { anchorStore } from '../scrollTo/scrollToStore';

function hasAnchor({ id }) {
    return id && id.length > 0;
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const SpacerAnchor = async ({ html, getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ id });
        if (!shouldAddToAnchor) return;

        anchorStore.set('items', (val) => {
            return [...val, { id, label, element }];
        });
    });

    return html`<div class="spacer spacer--${style} ${lineClass}"></div>`;
};
