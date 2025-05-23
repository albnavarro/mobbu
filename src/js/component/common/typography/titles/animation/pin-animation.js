import { outerHeight } from '@mobCoreUtils';
import { MobJs } from '@mobJs';
import { MobScroll } from '@mobMotion';
import { headerName } from 'src/js/component/instance-name';

/**
 * @type {import('../type').SectionPinAnimation}
 */
export const sectionPinAnimation = ({ element }) => {
    const container = /** @type {HTMLElement} */ (
        element.closest('.html-content')
    );

    /** @type {import('@mobJsType').UseMethodByName<import('@layoutComponent/header/type').Header>} */
    const headerMethods = MobJs.useMethodByName(headerName);

    let scroller = MobScroll.createScrollTrigger({
        item: element,
        trigger: container,
        dynamicStart: {
            position: 'bottom',
            value: () => {
                return window.innerHeight - headerMethods.getHeaderHeight();
            },
        },
        dynamicEnd: {
            position: 'top',
            value: () => {
                return headerMethods.getHeaderHeight() - outerHeight(container);
            },
        },
        pin: true,
        animatePin: true,
        anticipatePinOnLoad: false,
        forceTranspond: true,
        onEnter: () => {
            element.classList.add('pinned');
        },
        onEnterBack: () => {
            element.classList.add('pinned');
        },
        onLeave: () => {
            element.classList.remove('pinned');
        },
        onLeaveBack: () => {
            element.classList.remove('pinned');
        },
    });

    scroller.init();

    return {
        destroy: () => {
            scroller.destroy();
            // @ts-ignore
            scroller = null;
        },
    };
};
