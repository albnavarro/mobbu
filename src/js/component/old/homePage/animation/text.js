import { tween } from '../../../../mobMotion';

export const homeTextAnimation = ({ refs }) => {
    let textTween = tween.createTween({
        data: { y: 100 },
        duration: 500,
        ease: 'easeOutCubic',
        stagger: { each: 10 },
    });

    refs.forEach((item) => {
        textTween.subscribe(({ y }) => {
            item.style.translate = `0px ${y}%`;
        });
    });

    return {
        playText: () => textTween.goTo({ y: 0 }),
        destroyText: () => {
            textTween.destroy();
            textTween = null;
        },
    };
};
