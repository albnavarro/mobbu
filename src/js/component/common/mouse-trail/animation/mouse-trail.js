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
    let lastRotation = 0;
    let loopToAdd = 0;

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

        mouseTweenRotate.subscribeCache(item, ({ rotation }) => {
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
         * Get X
         */
        /**
         * Get Rad
         */
        const yDiff = y - lastY;
        const xDiff = x - lastX;

        /**
         * Rotation tween. TODO: usare seno e coseno
         */
        if (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10) {
            lastY = y;
            lastX = x;
            const rotationBase = Math.atan2(yDiff, xDiff) * RAD2DEG;
            const rotationParsed = rotationBase + 180;
            const difference = Math.abs(lastRotation - rotationParsed);

            /**
             * Fix 360 to 0;
             */
            if (difference > 180 && lastRotation < rotationParsed)
                loopToAdd -= difference;

            /**
             * Fix 360 to 0;
             */
            if (difference > 180 && lastRotation > rotationParsed)
                loopToAdd += difference;

            /**
             * Add or remove 360.
             */
            const rotationDef = rotationParsed + loopToAdd + 90;
            mouseTweenRotate.goTo({ rotation: rotationDef });
            lastRotation = rotationParsed;
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
            lastRotation = null;
            // @ts-ignore
            loopToAdd = null;
        },
    };
};
