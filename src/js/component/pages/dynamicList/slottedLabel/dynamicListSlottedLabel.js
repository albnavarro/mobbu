//@ts-check

import { html } from '../../../../mob/mobjs';

/**
 * @import { MobComponent } from '../../../../mob/mobjs/type';
 * @import { DynamicListSlottedLabel } from './type';
 **/

/** @type {MobComponent<DynamicListSlottedLabel>} **/
export const DynamicListSlottedLabelFn = ({ bindText }) => {
    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content">${bindText`slotted: ${'label'}`}</p>
    </div>`;
};
