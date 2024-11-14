//@ts-check

import { tween } from '../../../../mobMotion';
import { getRotate, getRotateFromPosition } from './utils';

/**
 * @import { MobComponent} from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3DItem>} */
export const Move3DItemfn = ({ html, getState, addMethod, onMount }) => {
    const {
        root,
        anchorPoint,
        animate,
        depth,
        rotate,
        width,
        height,
        offsetX,
        offsetY,
        range,
        initialRotate,
        classList,
    } = getState();

    const rootClass = root ? 'is-root' : 'is-children';
    const widthCssVar = `--item-width:${width};`;
    const heightCssVar = `--item-height:${height};`;
    const offsetXCssVar = `--offset-x:${offsetX};`;
    const offsetYCssVar = `--offset-y:${offsetY};`;

    let lerp = tween.createLerp({
        data: { depth: 0, rotateX: 0, rotateY: 0 },
    });

    /** @type{(arg0: {delta: number, limit: number}) => void} */
    const move = ({ delta: currentDelta, limit }) => {
        const currentDepth = Math.round((depth * currentDelta) / limit);

        const getRotateData = {
            startRotation: initialRotate,
            range: range,
            delta: currentDelta,
            limit: limit,
        };
        const baseRotateX = getRotate(getRotateData);
        const baseRotateY = getRotate(getRotateData);

        const getRotateFromPositionData = {
            rotate: rotate,
            anchorPoint: anchorPoint,
            baseRotateX,
            baseRotateY,
        };

        const { rotateX, rotateY } = getRotateFromPosition(
            getRotateFromPositionData
        );

        lerp.goTo({ depth: currentDepth, rotateX, rotateY }).catch(() => {});
    };

    addMethod(
        'move',
        (/** @type{{delta:number, limit:number}} */ { delta, limit }) => {
            if (animate) {
                move({ delta, limit });
            }
        }
    );

    onMount(({ element }) => {
        const unsubscribelerp = lerp.subscribe(
            ({ depth, rotateX, rotateY }) => {
                element.style.transform = `translate3D(0,0,${depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        );

        const unsubscribeOnComplete = lerp.onComplete(
            ({ depth, rotateX, rotateY }) => {
                element.style.transform = `translateZ(${depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        );

        if (!animate) {
            element.style.transform = `translateZ(${depth}px)`;
        }

        return () => {
            unsubscribelerp();
            unsubscribeOnComplete();
            lerp.destroy();

            // @ts-ignore
            lerp = null;
        };
    });

    return html`<div
        class="c-move3d-item ${rootClass} anchor-${anchorPoint}"
        style="${widthCssVar}${heightCssVar}${offsetXCssVar}${offsetYCssVar}"
    >
        <div class="c-move3d-item__content ${classList}"></div>
        <mobjs-slot></mobjs-slot>
    </div>`;
};
