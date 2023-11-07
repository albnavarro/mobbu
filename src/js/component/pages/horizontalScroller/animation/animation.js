import { mobCore } from '../../../../mobCore';
import { outerWidth } from '../../../../mobCore/utils';
import { scroller } from '../../../../mobMotion';
import { HorizontalScroller } from '../../../../mobMotion/plugin';

let sideWidth = 0;

const createPins = ({ indicators, setState }) => {
    return [...indicators].map((button, i) => {
        return scroller.createScrollTrigger({
            item: button,
            pin: true,
            animateAtStart: false,
            range: '0.1px', // Necessary to use onENter etc..
            animatePin: true,
            dynamicStart: {
                position: 'right',
                value: () => {
                    return (
                        window.innerWidth +
                        sideWidth -
                        outerWidth(button) * (i + 1)
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
            onEnter: () => {
                setState('currentId', -1);
                setState('currentIdFromScroll', i);
            },
            onLeaveBack: () => {
                // setState('currentId', -1);
                setState('currentIdFromScroll', i - 1);
            },
        });
    });
};

/**
 * Refresh pins position
 */
const refreshPins = ({ pins }) => {
    pins.forEach((pin) => pin.refresh());
};

/**
 * Create parallax titles
 */
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

/**
 * Hide navigation on scroll unpin
 */
const showNav = ({ nav }) => {
    nav.classList.add('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.add('active');
    });
};

/**
 * Shor navigation on scroll pin
 */
const hideNav = ({ nav }) => {
    nav.classList.remove('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.remove('active');
    });
};

/**
 * Create main scroller.
 */
export const horizontalScrollerAnimation = ({
    indicators,
    titles,
    nav,
    animatePin,
    setState,
}) => {
    const pins = createPins({ indicators, setState });
    const titlesParallax = createParallax({ titles });

    const side = document.querySelector('.l-navcontainer__side');
    sideWidth = outerWidth(side) / 2;

    const unsubscribeResize = mobCore.useResize(() => {
        sideWidth = outerWidth(side) / 2;
    });

    const horizontalCustom = new HorizontalScroller({
        root: '.js-root',
        container: '.js-container',
        row: '.js-row',
        column: '.js-column',
        trigger: '.js-trigger',
        shadowClass: '.shadowClass',
        useWillChange: true,
        useDrag: true,
        useSticky: !animatePin,
        animateAtStart: false,
        ease: true,
        addCss: true,
        columnHeight: 70,
        columnWidth: 100,
        columnAlign: 'center',
        pin: animatePin,
        animatePin,
        breakpoint: 'tablet',
        children: [...pins, ...titlesParallax],
        onEnter: () => {
            showNav({ nav, indicators });
        },
        onEnterBack: () => {
            /**
             * With fast scroll forward bottom of the page pin can lost position.
             * So upodate when scroller back active.
             */
            refreshPins({ pins });
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
        destroy: () => {
            horizontalCustom.destroy();
            unsubscribeResize();
        },
        refresh: () => horizontalCustom.refresh(),
    };
};
