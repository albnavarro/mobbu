import { outerWidth } from '../../../../mobCore/utils';
import { scroller, tween } from '../../../../mobMotion';
import { SmoothScroller } from '../../../../mobMotion/plugin';

/** @type{import('../type').CreatePathAnimation} */
const createPathAnimation = ({ pathElement, scrollerElement, wrapElement }) => {
    const pathSequencer = tween.createSequencer({
        data: { x: 0 },
    });

    pathSequencer.goTo({ x: 100 }, { start: 0, end: 10 });
    pathSequencer.subscribe(({ x }) => {
        pathElement.style.marginLeft = `${x}px`;
    });

    const pathScroller = scroller.createScrollTrigger({
        item: wrapElement,
        dynamicStart: {
            position: 'left',
            value: () => window.innerWidth,
        },
        dynamicEnd: {
            position: 'right',
            value: () => {
                return -outerWidth(scrollerElement) + window.innerWidth;
            },
        },
        propierties: 'tween',
        tween: pathSequencer,
        invertSide: true,
    });

    return {
        pathScroller,
        pathSequencer,
    };
};

/** @type{import('../type').AboutScroller} */
export const aboutAnimation = ({
    screenElement,
    scrollerElement,
    pathElement,
    wrapElement,
}) => {
    const { pathScroller, pathSequencer } = createPathAnimation({
        pathElement,
        scrollerElement,
        wrapElement,
    });

    const aboutScroller = new SmoothScroller({
        screen: screenElement,
        scroller: scrollerElement,
        direction: 'horizontal',
        drag: true,
        easeType: 'spring',
        breakpoint: 'small',
        children: [pathScroller],
    });

    aboutScroller.init();

    return {
        destroy: () => {
            aboutScroller.destroy();
            pathSequencer.destroy();
            pathScroller.destroy();
        },
    };
};
