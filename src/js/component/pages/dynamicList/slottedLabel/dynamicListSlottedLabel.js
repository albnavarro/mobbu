//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { DynamicListSlottedLabel } from './type';
 **/

/** @type {MobComponent<DynamicListSlottedLabel>} **/
export const DynamicListSlottedLabelFn = ({ html, bindText }) => {
    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content">${bindText`slotted: ${'label'}`}</p>
    </div>`;
};
