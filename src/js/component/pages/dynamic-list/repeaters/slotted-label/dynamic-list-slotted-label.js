//@ts-check

import { html } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {DynamicListSlottedLabel} from './type';
 */

/** @type {MobComponent<DynamicListSlottedLabel>} * */
export const DynamicListSlottedLabelFn = ({ bindText }) => {
    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content">${bindText`slotted: ${'label'}`}</p>
    </div>`;
};
