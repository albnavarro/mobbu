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

const showNav = ({ nav }) => {
    nav.classList.add('active');

    const buttons = document.querySelectorAll('.js-button');
    [...buttons].forEach((button) => {
        button.classList.add('active');
    });
};

const hideNav = ({ nav }) => {
    nav.classList.remove('active');

    const buttons = document.querySelectorAll('.js-button');
    [...buttons].forEach((button) => {
        button.classList.remove('active');
    });
};

export const horizontalScrollerAnimation = ({ buttons, titles, nav }) => {
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
        onEnter: () => {
            showNav({ nav, buttons });
        },
        onEnterBack: () => {
            showNav({ nav, buttons });
        },
        onLeave: () => {
            hideNav({ nav, buttons });
        },

        onLeaveBack: () => {
            hideNav({ nav, buttons });
        },
    });

    horizontalCustom.init();

    return () => {
        horizontalCustom.destroy();
    };
};
