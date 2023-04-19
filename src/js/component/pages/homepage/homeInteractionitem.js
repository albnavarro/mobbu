import { core, tween } from '../../../mobbu';

export const HomeInteractionItem = ({ onMount, render, props }) => {
    const { index } = props;

    onMount(() => {
        const group = document.querySelector(`#group-${index}`);

        /**
         * Disable 3D on safari.
         */
        // const enable3D = detectSafari() ? '' : 'translate3D(0,0,0)';

        /**
         * Create spring.
         */
        const rectTween = tween.createSpring({
            data: { rotate: 1000 },
        });

        /**
         * Subscribe to spring.
         */
        rectTween.subscribe(({ rotate }) => {
            group.style.transform = `translateZ(0) rotate(${rotate}deg)`;
        });

        /**
         * Track mouse.
         */
        const unsubscribeMouseMove = core.useMouseMove(({ client }) => {
            const { x } = client;
            const xCenter = window.innerWidth / 2 - x;
            const rotateX = parseInt(xCenter / 40) * index;
            rectTween.goTo({ rotate: rotateX });
        });

        rectTween.goTo({ rotate: 10 * index }, { config: 'scroller' });

        return () => {
            rectTween.destroy();
            unsubscribeMouseMove();
        };
    });

    return render(/* HTML */ '<div></div>');
};
