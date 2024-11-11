//@ts-check

/**
 * @import { MobComponent} from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3D>} */
export const Move3Dfn = ({ onMount, html }) => {
    onMount(() => {});

    /**
     * Desktop
     */
    return html`<div class="c-move-3d">move3d test</div>`;
};
