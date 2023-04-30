import { scroller } from '../../../../mobbu';
import { HorizontalScroller } from '../../../../mobbu/plugin';
import { outerWidth } from '../../../../mobbu/utils/vanillaFunction';

const createPins = ({ indicators }) => {
    return [...indicators].map((button, i) => {
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
                    const relativeIndex = indicators.length - (i - 2);
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

const showNav = ({ nav }) => {
    nav.classList.add('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.add('active');
    });
};

const hideNav = ({ nav }) => {
    nav.classList.remove('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.remove('active');
    });
};

export const horizontalScrollerAnimation = ({ indicators, titles, nav }) => {
    const pins = createPins({ indicators });
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
        onEnter: () => {
            showNav({ nav, indicators });
        },
        onEnterBack: () => {
            showNav({ nav, indicators });
        },
        onLeave: () => {
            hideNav({ nav, indicators });
        },
        onLeaveBack: () => {
            hideNav({ nav, indicators });
        },
    });

    horizontalCustom.init();

    return {
        destroy: () => horizontalCustom.destroy(),
        refresh: () => horizontalCustom.refresh(),
    };
};
