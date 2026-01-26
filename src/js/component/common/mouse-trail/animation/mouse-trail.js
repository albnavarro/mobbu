import { MobCore } from '@mobCore';
import { MobTween } from '@mobMotion';

/** @type {import('../type').MouseRotateAnimation} */
export const mouseTrailAnimation = ({ elements }) => {
    const RAD2DEG = 180 / Math.PI;

    /**
     * Generic utils.
     */
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    /**
     * Rotation utils.
     */
    let lastY = 0;
    let lastX = 0;
    let currentRotation = 0;

    /**
     * Create position tween.
     */
    let mouseTween = MobTween.createSpring({
        data: { x: 0, y: 0 },
        stagger: { each: 3, from: 'start' },
    });

    elements.forEach((item) => {
        mouseTween.subscribe(({ x, y }) => {
            item.style.translate = `${x}px ${y}px`;
        });
    });

    /**
     * Create rotation tween.
     */
    let mouseTweenRotate = MobTween.createSpring({
        data: { rotation: 0 },
        stagger: { each: 8, from: 'start' },
    });

    elements.forEach((item) => {
        if (!item) return;

        mouseTweenRotate.subscribeCache(({ rotation }) => {
            item.style.rotate = `${rotation}deg`;
        });
    });

    /**
     * Resize event.
     */
    const unsubScribeResize = MobCore.useResize(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    /**
     * Mouse move.
     */
    const unsubscribeMouseMove = MobCore.useMouseMove(({ client }) => {
        const { x, y } = client;

        /**
         * Calculate rotation based on movement direction.
         */
        const yDiff = y - lastY;
        const xDiff = x - lastX;

        /**
         * Calculate euclidean distance to avoid rotations on minimal movements.
         */
        const distance = Math.hypot(xDiff, yDiff);

        if (distance > 10) {
            lastY = y;
            lastX = x;

            /**
             * Get angle from movement direction
             */
            const targetAngle = Math.atan2(yDiff, xDiff) * RAD2DEG + 180 + 90;

            /**
             * Calculate the shortest angular distance between current and target rotation.
             * Normalize delta to [-180, 180] range to always take the shortest path.
             * Example: rotating from 350° to 10° will use +20° instead of -340°.
             * This prevents unwanted full rotations when crossing the 0°/360° boundary.
             */
            let delta = targetAngle - currentRotation;
            while (delta > 180) delta -= 360;
            while (delta < -180) delta += 360;

            /**
             * Update current rotation incrementally (spring tween handles smoothing)
             */
            currentRotation += delta;
            mouseTweenRotate.goTo({ rotation: currentRotation });
        }

        mouseTween.goTo({ x: x - windowWidth / 2, y: y - windowHeight / 2 });
    });

    return {
        destroy: () => {
            mouseTween.destroy();
            // @ts-ignore
            mouseTween = null;
            mouseTweenRotate.destroy();
            // @ts-ignore
            mouseTweenRotate = null;
            unsubScribeResize();
            unsubscribeMouseMove();
            // @ts-ignore
            windowWidth = null;
            // @ts-ignore
            windowHeight = null;
            // @ts-ignore
            lastY = null;
            // @ts-ignore
            lastX = null;
            // @ts-ignore
            currentRotation = null;
        },
    };
};
