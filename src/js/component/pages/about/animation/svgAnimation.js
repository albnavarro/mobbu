import { MobTween } from '../../../../mobMotion';

/** @type{import('../type').AboutSvgAnimation} */
export const aboutSvgAnimation = ({ elements }) => {
    let svgSpring = MobTween.createSpring({
        data: { x: 0 },
        stagger: {
            each: 10,
        },
    });

    const svgs = elements.map((el) => el.querySelector('svg'));

    svgs.forEach((el, index) => {
        if (!el) return;

        svgSpring.subscribe(({ x }) => {
            const multiplier = index === 1 ? -1 : 1;
            el.style.transform = `translateY(${x * multiplier}px)`;
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
