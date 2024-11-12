//@ts-check

/**
 * @import { MobComponent} from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3DItem>} */
export const Move3DItemfn = ({ html, getState }) => {
    const { test, root } = getState();

    const rootClass = root ? 'is-root' : 'is-children';

    return html`<div class="c-move3d-item ${rootClass}">
        <div class="c-move3d-item__content">${test}</div>
        <mobjs-slot></mobjs-slot>
    </div>`;
};
