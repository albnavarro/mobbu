//@ts-check

import { MobCore } from '@mobCore';
import { MobTimeline, MobTween } from '@mobMotion';
import { detectSafari } from '../../../../../utils/utils';

/** @type{import('../type').ChildAnimation} */
export const childAnimations = ({ groups, trails }) => {
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
     * Enable trail.
     */
    let trailCanMove = false;

    /**
     * Get trail path.
     */
    let tranilRotateElement = trails.map((item) => {
        return item.querySelector('svg');
    });

    /**
     * Create position tween.
     */
    let mouseTween = MobTween.createSpring({
        data: { x: 0, y: 0 },
        stagger: { each: 3, from: 'start' },
    });

    trails.forEach((item) => {
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

    tranilRotateElement.forEach((item) => {
        if (!item) return;

        mouseTweenRotate.subscribeCache(item, ({ rotation }) => {
            item.style.rotate = `${rotation}deg`;
        });
    });

    /**
     * Create trail intro tween.
     */
    let trailIntro = MobTween.createTimeTween({
        data: { opacity: 0, scale: 1.4 },
    });

    trails.forEach((item) => {
        trailIntro.subscribe(({ scale, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = opacity;
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
        if (!trailCanMove) return;

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
         * Rotation tween.
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

    /**
     * Intro tween.
     */
    let introTween = MobTween.createTimeTween({
        data: { opacity: 0, scale: 0.95 },
        duration: 2000,
        ease: 'easeOutQuart',
        stagger: { waitComplete: true, each: 5, from: 'center' },
    });

    groups.forEach((item) => {
        introTween.subscribeCache(item, ({ scale, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = `${opacity}`;
        });
    });

    let introTl = MobTimeline.createAsyncTimeline({ repeat: 1 })
        .createGroup()
        .goTo(introTween, {
            opacity: 1,
            scale: 1,
        })
        .goTo(trailIntro, {
            scale: 1,
            opacity: 1,
        })
        .closeGroup();

    return {
        playIntro: async () => {
            return introTl.play().then(() => {
                const timeOutValue = detectSafari() ? 500 : 0;

                setTimeout(() => {
                    trailCanMove = true;
                }, timeOutValue);
            });
        },
        destroy: () => {
            introTween.destroy();
            // @ts-ignore
            introTween = null;
            introTl.destroy();
            // @ts-ignore
            introTl = null;
            mouseTween.destroy();
            // @ts-ignore
            mouseTween = null;
            mouseTweenRotate.destroy();
            // @ts-ignore
            mouseTweenRotate = null;
            trailIntro.destroy();
            // @ts-ignore
            trailIntro = null;
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
            // @ts-ignore
            tranilRotateElement = null;
        },
    };
};
