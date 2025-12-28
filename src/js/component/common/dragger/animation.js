import { MobCore } from '@mobCore';
import { isDescendant } from '@mobCoreUtils';
import { MobMotionCore, MobTween } from '@mobMotion';
import {
    DRAGGER_BOTTOM_LEFT,
    DRAGGER_BOTTOM_RIGHT,
    DRAGGER_TOP_LEFT,
    DRAGGER_TOP_RIGHT,
} from './constant';

/** @type {import('./type').DraggerAnimation} */
export const draggerAnimation = ({
    align,
    root,
    child,
    perspective,
    usePrespective,
    maxLowDepth = -200,
    maxHightDepth = 200,
    onDepthChange = () => {},
}) => {
    /**
     * Mutables inner state:
     */
    let dragY = 0;
    let dragX = 0;
    let depth = 0;
    let lastX = 0;
    let lastY = 0;
    let itemWidth = child.offsetWidth;
    let itemHeight = child.offsetHeight;
    let rootWidth = root.offsetWidth;
    let rootHeight = root.offsetHeight;
    let dragLimitX = (itemWidth - rootWidth) / 2;
    let dragLimitY = (itemHeight - rootHeight) / 2;

    /**
     * Detect click
     */
    let firstTouchValue = { x: 0, y: 0 };
    let onDrag = false;
    let firstDrag = false;
    const threshold = 30;
    const depthThreshold = 20;

    /**
     * Update limit with current perspective value.
     *
     * - Durante la scale child non cambia dimensione reale cosi come root
     * - Child cambia pero la dimensione apparente per l'effetto della prospettiva
     * - RootWidth / scale -> dimensione virtuale che avremmo se root fosse scalato come child
     *
     * Esempio:
     *
     * - ItemWidth = 400px
     * - RootWidth = 300px
     * - Scale = 1.5
     * - DragLimitX = (400 - 300/1.5) / 2 = (400 - 200) / 2 = 100px
     * - Root "visto dal sistema di riferimento del child scalato" vale 200px, quindi il child può muoversi di 100px prima
     *   che i bordi collidano. La divisione per scale compensa la trasformazione prospettica, mantenendo i limiti
     *   coerenti con ciò che l'utente vede.
     */
    const updatePerspectiveLimits = () => {
        if (usePrespective && perspective > 0) {
            const scale = perspective / (perspective - depth);

            /**
             * - Value > 0 child is bigger than root.
             * - Value < 0 child is smaller than root.
             */
            dragLimitX = (itemWidth - rootWidth / scale) / 2;
            dragLimitY = (itemHeight - rootHeight / scale) / 2;
        } else {
            dragLimitX = (itemWidth - rootWidth) / 2;
            dragLimitY = (itemHeight - rootHeight) / 2;
        }
    };

    /**
     * First run
     */
    updatePerspectiveLimits();

    /**
     * Animation
     */
    let endValue = { xValue: 0, yValue: 0 };

    let spring = MobTween.createSpring({
        data: {
            x: 0,
            y: 0,
            z: 0,
        },
    });

    switch (align) {
        case DRAGGER_TOP_LEFT: {
            endValue = {
                xValue: dragLimitX,
                yValue: dragLimitY,
            };
            dragX = itemWidth;
            dragY = itemHeight;
            break;
        }

        case DRAGGER_TOP_RIGHT: {
            endValue = {
                xValue: -dragLimitX,
                yValue: dragLimitY,
            };
            dragX = -itemWidth;
            dragY = itemHeight;
            break;
        }

        case DRAGGER_BOTTOM_LEFT: {
            endValue = {
                xValue: dragLimitX,
                yValue: -dragLimitY,
            };
            dragX = itemWidth;
            dragY = -itemHeight;
            break;
        }

        case DRAGGER_BOTTOM_RIGHT: {
            endValue = {
                xValue: -dragLimitX,
                yValue: -dragLimitY,
            };
            dragX = -itemWidth;
            dragY = -itemHeight;
            break;
        }
    }

    const unsubscribeSpring = spring.subscribe(({ x, y, z }) => {
        if (!child) return;

        child.style.transform = `translate3D(${x}px, ${y}px, ${z}px)`;
    });

    spring.set({
        x: endValue.xValue,
        y: endValue.yValue,
    });

    const activeElement = root.querySelectorAll('a, button');
    [...activeElement].forEach((item) => {
        /** @type {HTMLElement} */ (item).setAttribute('draggable', 'false');
        /** @type {HTMLElement} */ (item).style.userSelect = 'none';
    });

    /**
     * Listener function:
     *
     * @param {object} params
     * @param {{ x: number; y: number }} params.page
     * @param {EventTarget | null} params.target
     */
    const startDrag = ({ page, target }) => {
        if (
            target === child ||
            isDescendant(child, /** @type {HTMLElement | undefined} */ (target))
        ) {
            onDrag = true;
            firstDrag = true;
            firstTouchValue = { x: page.x, y: page.y };
        }
    };

    /**
     * @param {object} params
     * @param {{ x: number; y: number }} params.page
     */
    const move = ({ page }) => {
        const { x, y } = page;

        /**
         * Get difference form last value
         */
        const { xgap, ygap } = (() => {
            if (!onDrag) return { xgap: 0, ygap: 0 };

            if (firstDrag) {
                firstDrag = false;

                return {
                    xgap: 0,
                    ygap: 0,
                };
            } else {
                return {
                    xgap: x - lastX,
                    ygap: y - lastY,
                };
            }
        })();

        /**
         * Clamp to limit x when child is bigger than root or smaller than root
         */
        const xValueOnDrag =
            dragLimitX > 0
                ? MobMotionCore.clamp(dragX + xgap, -dragLimitX, dragLimitX)
                : MobMotionCore.clamp(dragX + xgap, dragLimitX, -dragLimitX);

        /**
         * Clamp to limit x when child is bigger than root or smaller than root
         */
        const yValueOnDrag =
            dragLimitY > 0
                ? MobMotionCore.clamp(dragY + ygap, -dragLimitY, dragLimitY)
                : MobMotionCore.clamp(dragY + ygap, dragLimitY, -dragLimitY);

        /**
         * Get x value clamped to min max if is dragging or last value
         */
        const currentDragX = onDrag ? xValueOnDrag : dragX;

        /**
         * Get y value clamped to min max if is dragging or last value
         */
        const currenteDragY = onDrag ? yValueOnDrag : dragY;

        /**
         * Use calmped value or mouse value if is dragging
         */
        const { xComputed, yComputed } = onDrag
            ? {
                  xComputed: currentDragX,
                  yComputed: currenteDragY,
              }
            : {
                  xComputed: x,
                  yComputed: y,
              };

        /**
         * Update global value
         */
        dragX = currentDragX;
        dragY = currenteDragY;

        lastX = x;
        lastY = y;

        if (onDrag) {
            endValue = { xValue: xComputed, yValue: yComputed };
            spring.goTo({ x: xComputed, y: yComputed }).catch(() => {});
        }
    };

    /**
     * Add start drag listener
     */
    const unsubscribeTouchStart = MobCore.useTouchStart(({ page, target }) => {
        startDrag({ page, target });
    });

    const unsubscribeMouseDown = MobCore.useMouseDown(({ page, target }) => {
        startDrag({ page, target });
    });

    /**
     * Add end drag listener
     */
    const unsubscribeTouchEnd = MobCore.useTouchEnd(() => {
        onDrag = false;
    });

    const unsubscribeMouseUp = MobCore.useMouseUp(() => {
        onDrag = false;
    });

    /**
     * Add drag listener
     */
    const unsubscribeMouseMove = MobCore.useMouseMove(({ page }) => {
        move({ page });
    });

    const unsubscribeTouchMove = MobCore.useTouchMove(({ page }) => {
        move({ page });
    });

    /**
     * PreventChecker - prevent default if scroll difference from dow to up is less thshold value
     */
    root.addEventListener(
        'click',
        (event) => {
            const { x, y } = firstTouchValue;

            const xChecker = Math.abs(lastX - x) > threshold;
            const yChecker = Math.abs(lastY - y) > threshold;

            if (xChecker || yChecker) {
                event.preventDefault();
            }
        },
        false
    );

    if (usePrespective) {
        child.addEventListener(
            'wheel',
            (event) => {
                const { spinY } = MobCore.normalizeWheel(event);
                depth = MobMotionCore.clamp(
                    depth + spinY * depthThreshold,
                    maxLowDepth,
                    maxHightDepth
                );

                updatePerspectiveLimits();
                onDepthChange({ depth });

                spring.goTo({ z: depth }).catch(() => {});
            },
            { passive: true }
        );
    }

    /**
     * Update cached values on resize
     */
    const unsubscribeResize = MobCore.useResize(() => {
        itemWidth = child.offsetWidth;
        itemHeight = child.offsetHeight;
        rootWidth = root.offsetWidth;
        rootHeight = root.offsetHeight;
        updatePerspectiveLimits();
    });

    return {
        destroy: () => {
            unsubscribeSpring();
            unsubscribeTouchStart();
            unsubscribeTouchEnd();
            unsubscribeMouseDown();
            unsubscribeMouseUp();
            unsubscribeMouseMove();
            unsubscribeTouchMove();
            unsubscribeResize();
            spring.destroy();
            // @ts-ignore
            spring = null;

            /**
             * Le referenze in ingresso passano una copia dei puntatori alla memoria in cui root e child sono salvate,
             *
             * - E' necessario eliminare il riferimento alla copia dei puntatori direttamante all' interno della funzione
             *   chiamata.
             */

            // @ts-ignore
            root = null;

            // @ts-ignore
            child = null;
        },
    };
};
