import { scroller } from '../../../../mobbu';
import { HorizontalScroller } from '../../../../mobbu/plugin';
import { outerWidth } from '../../../../mobbu/utils/vanillaFunction';

const createPins = ({ buttons }) => {
    return [...buttons].map((button, i) => {
        return scroller.createScrollTrigger({
            item: button,
            pin: true,
            animateAtStart: false,
            animatePin: true,
            dynamicStart: {
                position: 'right',
                value: () => {
                    return (
                        window.innerWidth + 20 - outerWidth(button) * (i + 1)
                    );
                },
            },
            dynamicEnd: {
                position: 'right',
                value: () => {
                    const relativeIndex = buttons.length - (i - 2);
                    return (window.innerWidth / 10) * 9 * relativeIndex;
                },
            },
        });
    });
};

const createParallax = ({ titles }) => {
    return [...titles].map((title) => {
        return scroller.createParallax({
            item: title,
            propierties: 'x',
            reverse: true,
            range: '9',
        });
    });
};

export const horizontalScrollerAnimation = ({ buttons, titles }) => {
    const pins = createPins({ buttons });
    const titlesParallax = createParallax({ titles });

    const horizontalCustom = new HorizontalScroller({
        root: '.js-root',
        container: '.js-container',
        row: '.js-row',
        column: '.js-column',
        trigger: '.js-trigger',
        shadowClass: '.shadowClass',
        useWillChange: true,
        useDrag: true,
        useSticky: true,
        animateAtStart: false,
        ease: true,
        addCss: true,
        columnHeight: 70,
        columnWidth: 100,
        columnAlign: 'center',
        breackpoint: 'tablet',
        children: [...pins, ...titlesParallax],
    });

    horizontalCustom.init();

    return () => {
        horizontalCustom.destroy();
    };
};
