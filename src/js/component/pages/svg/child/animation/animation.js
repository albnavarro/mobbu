import { mobCore } from '../../../../../mobCore';
import { timeline, tween } from '../../../../../mobMotion';

export const childAnimations = ({
    groups,
    trails,
    boxWidth,
    boxHeight,
    svg,
}) => {
    /**
     * Generic utils.
     */
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let svgWidth = svg.clientWidth;
    let svgHeight = svg.clientHeight;

    /**
     * Rotation utils.
     */
    let lastY = 0;
    let lastX = 0;
    let lastRotation = 0;
    let loopToAdd = 0;

    /**
     * Get trail path.
     */
    let tranilRotateElement = trails.map((item) => {
        return item.querySelector('path');
    });

    /**
     * Create position tween.
     */
    let mouseTween = tween.createSpring({
        data: { x: 0, y: 0 },
        stagger: { each: 2, from: 'start' },
    });

    trails.forEach((item) => {
        mouseTween.subscribe(({ x, y }) => {
            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    /**
     * Create rotation tween.
     */
    let mouseTweenRotate = tween.createSpring({
        data: { rotation: 0 },
        stagger: { each: 5, from: 'start' },
    });

    tranilRotateElement.forEach((item) => {
        mouseTweenRotate.subscribeCache(item, ({ rotation }) => {
            item.style.rotate = `${rotation}deg`;
        });
    });

    /**
     * Resize event.
     */
    const unsubScribeResize = mobCore.useResize(() => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        svgWidth = svg.clientWidth;
        svgHeight = svg.clientHeight;
    });

    /**
     * Mouse move.
     */
    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
        const { x, y } = client;

        /**
         * Get X
         */
        const x1 = (x * boxWidth) / windowWidth;
        const x2 = x1 - boxWidth / 2;
        const x3 = (x2 * windowWidth) / svgWidth;

        /**
         * Get Y
         */
        const y1 = (y * boxHeight) / windowHeight;
        const y2 = y1 - boxHeight / 2;
        const y3 = (y2 * windowHeight) / svgHeight;

        /**
         * Get Rad
         */
        const RAD2DEG = 180 / Math.PI;
        const yDiff = y3 - lastY;
        const xDiff = x3 - lastX;

        /**
         * Rotation tween.
         */
        if (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10) {
            lastY = y3;
            lastX = x3;
            const rotationBase = Math.atan2(yDiff, xDiff) * RAD2DEG;
            const rotationParsed = rotationBase + 180;
            const difference = Math.abs(lastRotation - rotationParsed);

            /**
             * Fix 360 to 0;
             */
            if (difference > 180 && lastRotation < rotationParsed)
                loopToAdd -= 360;

            /**
             * Fix 360 to 0;
             */
            if (difference > 180 && lastRotation > rotationParsed)
                loopToAdd += 360;

            /**
             * Add or remove 360.
             */
            const rotationDef = rotationParsed + loopToAdd + 90;
            mouseTweenRotate.goTo({ rotation: rotationDef });
            lastRotation = rotationParsed;
        }

        mouseTween.goTo({ x: x3, y: y3 });
    });

    /**
     * Intro tween.
     */
    let introTween = tween.createTween({
        data: { opacity: 0, scale: 0.95 },
        duration: 2000,
        ease: 'easeOutQuart',
        stagger: { each: 5, from: 'center' },
    });

    groups.forEach((item) => {
        introTween.subscribe(({ scale, opacity }) => {
            item.style.scale = `${scale}`;
            item.style.opacity = opacity;
        });
    });

    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).goTo(introTween, {
        opacity: 1,
        scale: 1,
    });

    return {
        playIntro: async () => {
            return introTl.play();
        },
        destroy: () => {
            introTween.destroy();
            introTween = null;
            introTl.destroy();
            introTl = null;
            mouseTween.destroy();
            mouseTween = null;
            mouseTweenRotate.destroy();
            mouseTweenRotate = null;
            unsubScribeResize();
            unsubscribeMouseMove();
            windowWidth = null;
            windowHeight = null;
            svgWidth = null;
            svgHeight = null;
            lastY = null;
            lastX = null;
            lastRotation = null;
            loopToAdd = null;
            tranilRotateElement = null;
        },
    };
};
