//@ts-check

/** @param {string} value */
function setContent(value) {
    return `slotted: ${value}`;
}

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { DynamicListSlottedLabel } from './type';
 **/

/** @type {MobComponent<DynamicListSlottedLabel>} **/
export const DynamicListSlottedLabelFn = ({
    html,
    onMount,
    watch,
    getState,
    setRef,
    getRef,
}) => {
    const { label } = getState();

    onMount(() => {
        const { contentEl } = getRef();

        watch('label', (value) => {
            contentEl.innerHTML = setContent(value);
        });

        return () => {};
    });

    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content" ${setRef('contentEl')}>${setContent(label)}</p>
    </div>`;
};
