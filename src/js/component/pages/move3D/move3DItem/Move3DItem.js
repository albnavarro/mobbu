//@ts-check

/**
 * @import { MobComponent} from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3DItem>} */
export const Move3DItemfn = ({ html, getState, addMethod, onMount }) => {
    const { root, anchorPoint, animate } = getState();
    const rootClass = root ? 'is-root' : 'is-children';

    onMount(() => {
        addMethod('move', ({ delta, limit }) => {
            if (animate) console.log(delta, limit);
        });
    });

    return html`<div class="c-move3d-item ${rootClass} anchor-${anchorPoint}">
        <div class="c-move3d-item__content"></div>
        <mobjs-slot></mobjs-slot>
    </div>`;
};
