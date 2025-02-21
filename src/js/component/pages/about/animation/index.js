import { SmoothScroller } from '../../../../mobMotion/plugin';

/** @type{import('../type').AboutScroller} */
export const aboutAnimation = ({ screen, scroller }) => {
    const aboutScroller = new SmoothScroller({
        screen,
        scroller,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
    });

    aboutScroller.init();

    return {
        destroy: () => aboutScroller.destroy(),
    };
};
