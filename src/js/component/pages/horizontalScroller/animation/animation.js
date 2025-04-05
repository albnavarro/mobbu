// @ts-check
import { MobCore } from '@mobCore';
import { MobHorizontalScroller } from '@mobMotionPlugin';
import { outerWidth } from '@mobCoreUtils';
import { MobScroll } from '@mobMotion';

let sideWidth = 0;

/**
 * @param {object} params
 * @param {HTMLElement[]} params.indicators
 * @param {import('@mobJsType').SetState<import('../type.d.ts').HorizontalScroller>} params.setState
 * @returns {import( '@mobMotionType').MobScroller[]}
 */
const createPins = ({ indicators, setState }) => {
    return [...indicators].map((button, i) => {
        return MobScroll.createScrollTrigger({
            item: button,
            pin: true,
            animateAtStart: false,
            animatePin: true,
            useThrottle: true,
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
 * @param {object} params
 * @param {import( '../../../../mob/mobMotion/type').MobScroller[]} params.pins
 */
const refreshPins = ({ pins }) => {
    pins.forEach((pin) => pin.refresh());
};

/**
 * @param {object} params
 * @param {HTMLElement[]} params.titles
 * @returns {import( '../../../../mob/mobMotion/type').MobScroller[]}
 */
const createParallax = ({ titles }) => {
    return [...titles].map((title) => {
        return MobScroll.createParallax({
            item: title,
            propierties: 'x',
            reverse: true,
            range: 9,
        });
    });
};

/**
 * @param {object} params
 * @param {HTMLElement} params.nav
 * @returns {void}
 */
const showNav = ({ nav }) => {
    nav.classList.add('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.add('active');
    });
};

/**
 * @param {object} params
 * @param {HTMLElement} params.nav
 * @returns {void}
 */
const hideNav = ({ nav }) => {
    nav.classList.remove('active');

    const indicators = document.querySelectorAll('.js-indicator');
    [...indicators].forEach((indicator) => {
        indicator.classList.remove('active');
    });
};

/**
 * @param {object} params
 * @param {HTMLElement[]} params.indicators
 * @param {HTMLElement[]} params.titles
 * @param {HTMLElement} params.nav
 * @param {boolean} params.animatePin
 * @param {import('../../../../mob/mobjs/type').SetState<import('../type.d.ts').HorizontalScroller>} params.setState
 * @param {HTMLElement} params.rootRef
 */
export const horizontalScrollerAnimation = ({
    indicators,
    titles,
    nav,
    animatePin,
    setState,
    rootRef,
}) => {
    let pins = createPins({ indicators, setState });
    let titlesParallax = createParallax({ titles });

    const side = document.querySelector('.l-navcontainer__side');
    // @ts-ignore
    sideWidth = outerWidth(side) / 2;

    const unsubscribeResize = MobCore.useResize(() => {
        // @ts-ignore
        sideWidth = outerWidth(side) / 2;
    });

    let horizontalCustom = new MobHorizontalScroller({
        root: rootRef,
        container: '.js-container',
        row: '.js-row',
        column: '.js-column',
        trigger: '.js-trigger',
        shadowClass: '.shadowClass',
        useWillChange: true,
        useDrag: true,
        useSticky: !animatePin,
        useThrottle: true,
        animateAtStart: false,
        ease: true,
        easeType: 'lerp',
        addCss: true,
        columnHeight: 70,
        columnWidth: 100,
        columnAlign: 'center',
        animatePin,
        breakpoint: 'tablet',
        children: [...pins, ...titlesParallax],
        onEnter: () => {
            showNav({ nav });
        },
        onEnterBack: () => {
            /**
             * With fast scroll forward bottom of the page pin can lost position.
             * So upodate when scroller back active.
             */
            refreshPins({ pins });
            showNav({ nav });
        },
        onLeave: () => {
            hideNav({ nav });
        },
        onLeaveBack: () => {
            hideNav({ nav });
        },
    });

    horizontalCustom.init();

    return {
        destroy: () => {
            /**
             * Destroy pin.
             */
            pins.forEach((pin) => {
                pin?.destroy();
            });
            pins = [];

            /**
             * Destroy titles.
             */
            titlesParallax.forEach((item) => {
                item?.destroy();
            });
            titlesParallax = [];

            /**
             * Destroy timelines.
             */
            horizontalCustom.destroy();
            // @ts-ignore
            horizontalCustom = null;
            unsubscribeResize();
        },
        refresh: () => horizontalCustom.refresh(),
    };
};
