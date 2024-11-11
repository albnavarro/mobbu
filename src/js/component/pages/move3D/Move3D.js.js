//@ts-check

import { tween } from '../../../mobMotion';

/**
 * @import { MobComponent} from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3D>} */
export const Move3Dfn = ({ onMount, html, getState, setRef, getRef }) => {
    const {
        yLimit,
        xLimit,
        yDepth,
        xDepth,
        perspective,
        centerToViewoport,
        drag,
    } = getState();

    const pageY = drag && centerToViewoport;

    let height = 0;
    let width = 0;
    let offSetLeft = 0;
    let offSetTop = 0;
    let delta = 0;
    let limit = 0;
    let lastX = 0;
    let dragX = 0;
    let lastY = 0;
    let dragY = 0;
    let onDrag = false;
    let firstDrag = false;
    const spring = tween.createSpring({ data: { ax: 0, ay: 0 } });

    onMount(() => {
        const { container } = getRef();

        const unsubscribeSpring = spring.subscribe(({ ax, ay }) => {
            container.style.transform = `translate3D(0,0,0) rotateY(${ax}deg) rotateX(${ay}deg)`;
        });

        const unsubscribeOnComplete = spring.onComplete(({ ax, ay }) => {
            container.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
        });

        return () => {
            unsubscribeSpring();
            unsubscribeOnComplete();
            spring.destroy();
        };
    });

    /**
     * Desktop
     */
    return html`<div class="c-move-3d">
        <div class="c-move-3d__scene">
            <div class="c-move-3d__container" ${setRef('container')}>
                container
            </div>
        </div>
    </div>`;
};
