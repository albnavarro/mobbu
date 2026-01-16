import { MobCore } from '@mobCore';
import { MobMotionCore, MobTween } from '@mobMotion';
import {
    DRAGGER_BOTTOM_LEFT,
    DRAGGER_BOTTOM_RIGHT,
    DRAGGER_TOP_LEFT,
    DRAGGER_TOP_RIGHT,
} from './constant';

/**
 * Extract translateZ value from element's transform style
 */
const getTranslateZ = (/** @type {HTMLElement} */ el) => {
    const style = globalThis.getComputedStyle(el);
    const transform = style.transform;

    if (transform === 'none') return 0;

    /**
     * Matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) translateZ is the 15th value (index 14)
     */
    const matrix3dMatch = transform.match(/matrix3d\(([^)]+)\)/);
    if (matrix3dMatch) {
        const values = matrix3dMatch[1].split(',').map(Number);
        return values[14] || 0;
    }

    return 0;
};

/** @type {import('./type').DraggerAnimation} */
export const draggerAnimation = ({
    align,
    root,
    child,
    containerClass,
    childrenClass,
    perspective,
    usePrespective,
    maxLowDepth = -200,
    maxHightDepth = 200,
    onDepthChange = () => {},
    depthFactor = 30,
    hideThreshold = 1.3,
}) => {
    let containerEl = /** @type {HTMLElement} */ (
        document.querySelector(containerClass)
    );

    if (containerEl) {
        containerEl.style.cursor = 'grab';
    }

    let children = /** @type {HTMLElement[]} */ ([
        ...containerEl.querySelectorAll(childrenClass),
    ]);

    const childrenDepthThreshold = children.map((childEl) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const childWidth = childEl.offsetWidth;
        const childHeight = childEl.offsetHeight;
        const childTranslateZ = getTranslateZ(childEl);

        /**
         * Dimensione virtuale
         *
         * - La larghezza che l'utente vede è:
         * - VirtualWidth = childWidth * scale
         *
         * Quando nascondere?
         *
         * - Vogliamo nascondere quando:
         * - VirtualWidth > viewportWidth * hideThreshold
         *
         * Derivazione ( Sostituendo: )
         *
         * - ChildWidth * scale > viewportWidth * hideThreshold
         * - ChildWidth * (perspective / (perspective - effectiveZ)) > viewportWidth * hideThreshold
         * - Dove effectiveZ = depth + childTranslateZ (profondità totale = contenitore + child).
         *
         * Risolvendo per depth:
         *
         * - Perspective / (perspective - effectiveZ) > (viewportWidth * hideThreshold) / childWidth
         * - Perspective - effectiveZ < (perspective * childWidth) / (viewportWidth * hideThreshold)
         * - EffectiveZ > perspective - (perspective * childWidth) / (viewportWidth * hideThreshold)
         * - Depth + childTranslateZ > perspective - (perspective * childWidth) / (viewportWidth * hideThreshold)
         * - Depth > perspective - (perspective * childWidth) / (viewportWidth * hideThreshold) - childTranslateZ
         *
         * Risultato finale
         *
         * - DepthThresholdX = perspective - (perspective * childWidth) / (viewportWidth * hideThreshold) -
         *   childTranslateZ;
         * - Quando depth > depthThresholdX, il child appare più largo dell'80% ( hideThreshold ) del viewport -> va
         *   nascosto.
         */
        const depthThresholdX =
            perspective -
            (perspective * childWidth) / (viewportWidth * hideThreshold) -
            childTranslateZ;

        const depthThresholdY =
            perspective -
            (perspective * childHeight) / (viewportHeight * hideThreshold) -
            childTranslateZ;

        const threshold = Math.min(depthThresholdX, depthThresholdY);
        return threshold;
    });

    /**
     * Toggle hide class based on current depth
     */
    const updateChildrenVisibility = () => {
        children.forEach((childEl, index) => {
            const shouldHide = depth > childrenDepthThreshold[index];
            childEl.classList.toggle('hide', shouldHide);
        });
    };

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
    const startDrag = ({ page }) => {
        onDrag = true;
        firstDrag = true;
        firstTouchValue = { x: page.x, y: page.y };
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
    if (containerEl)
        containerEl.addEventListener(
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

    if (usePrespective && containerEl) {
        containerEl.addEventListener(
            'wheel',
            (event) => {
                const { spinY } = MobCore.normalizeWheel(event);
                depth = MobMotionCore.clamp(
                    depth + spinY * depthFactor,
                    maxLowDepth,
                    maxHightDepth
                );

                /**
                 * Update dragLimitY && dragLimitY based on current scale value.
                 */
                updatePerspectiveLimits();

                /**
                 * Clamp current position to new limits
                 *
                 * - We need to maintain constrain while zoom action si active.
                 */
                dragX =
                    dragLimitX > 0
                        ? MobMotionCore.clamp(dragX, -dragLimitX, dragLimitX)
                        : MobMotionCore.clamp(dragX, dragLimitX, -dragLimitX);

                dragY =
                    dragLimitY > 0
                        ? MobMotionCore.clamp(dragY, -dragLimitY, dragLimitY)
                        : MobMotionCore.clamp(dragY, dragLimitY, -dragLimitY);

                onDepthChange({ depth });

                spring.goTo({ x: dragX, y: dragY, z: depth }).catch(() => {});
            },
            { passive: true }
        );
    }

    const unsubScribeMouseWheel = MobCore.useMouseWheel(
        MobCore.useDebounce(() => {
            updateChildrenVisibility();
        }, 100)
    );

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
            unsubScribeMouseWheel();
            spring.destroy();
            // @ts-ignore
            spring = null;

            // @ts-ignore
            containerEl = null;

            // @ts-ignore
            children = null;

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
