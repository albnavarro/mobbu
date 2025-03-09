//@ts-check

import { html, staticProps } from '../../../../mobjs';
import { MobTween } from '../../../../mobMotion';
import { getRotate, getRotateFromPosition } from './utils';

/** @type{(component: {tagName: string, className: string, props: any} ) => string} */
const getComponent = (component) => {
    if (component?.tagName.length === 0) {
        return '';
    }

    return html`
        <div class="c-move3d-item__component ${component?.className}">
            <${component.tagName} ${staticProps(component?.props ?? {})}>
            </${component.tagName}>
        </div>`;
};

/**
 * @import { MobComponent} from '../../../../mobjs/type';
 **/

/** @type{import('./type').Move3DItemMove} */
const move = ({
    delta: currentDelta,
    factor,
    initialRotate,
    depth,
    range,
    rotate,
    anchorPoint,
    lerp,
}) => {
    const currentDepth = Math.round((depth * currentDelta) / factor);

    const getRotateData = {
        startRotation: initialRotate ?? 0,
        range: range ?? 20,
        delta: currentDelta,
        limit: factor,
    };
    const baseRotateX = getRotate(getRotateData);
    const baseRotateY = getRotate(getRotateData);

    const getRotateFromPositionData = {
        rotate: rotate ?? 'center',
        anchorPoint: anchorPoint,
        baseRotateX,
        baseRotateY,
    };

    const { rotateX, rotateY } = getRotateFromPosition(
        getRotateFromPositionData
    );

    lerp.goTo({ depth: currentDepth, rotateX, rotateY }).catch(() => {});
};

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
        initialDepth,
        classList,
        component,
    } = getState();

    const rootClass = root ? 'is-root' : 'is-children';
    const widthCssVar = `--item-width:${width};`;
    const heightCssVar = `--item-height:${height};`;
    const offsetXCssVar = `--offset-x:${offsetX};`;
    const offsetYCssVar = `--offset-y:${offsetY};`;

    let lerp = MobTween.createLerp({
        data: { depth: 0, rotateX: 0, rotateY: 0 },
    });

    addMethod('move', ({ delta, factor }) => {
        if (animate) {
            move({
                delta,
                factor,
                initialRotate,
                depth,
                range,
                rotate,
                anchorPoint,
                lerp,
            });
        }
    });

    onMount(({ element }) => {
        const unsubscribelerp = lerp.subscribe(
            ({ depth, rotateX, rotateY }) => {
                const currentDepth = depth + initialDepth;
                element.style.transform = `translate3D(0,0,${currentDepth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        );

        const unsubscribeOnComplete = lerp.onComplete(
            ({ depth, rotateX, rotateY }) => {
                const currentDepth = depth + initialDepth;
                element.style.transform = `translateZ(${currentDepth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        );

        /**
         * Initial z-index state
         */
        const currentDepth = initialDepth;
        element.style.transform = `translateZ(${currentDepth}px)`;

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
        ${getComponent({
            tagName: component?.tagName ?? '',
            className: component?.className ?? '',
            props: component?.props ?? {},
        })}
        <mobjs-slot></mobjs-slot>
    </div>`;
};
