import { MobTween } from '@mobMotion';

/** @type{import('../type').AboutSvgAnimation} */
export const aboutSvgAnimation = ({ elements }) => {
    let svgSpring = MobTween.createSpring({
        data: { x: 0 },
        stagger: {
            each: 5,
        },
    });

    const svgs = elements.map((el) => el.querySelector('svg'));

    svgs.forEach((el) => {
        if (!el) return;

        svgSpring.subscribe(({ x }) => {
            el.style.transform = `translate3D(0,0,0) translateY(${-x}px)`;
        });

        svgSpring.onComplete(({ x }) => {
            el.style.transform = `translateY(${-x}px)`;
        });
    });

    return {
        svgSpring,
        destroySvgSpring: () => {
            svgSpring.destroy();
            // @ts-ignore
            svgSpring = null;
        },
    };
};
