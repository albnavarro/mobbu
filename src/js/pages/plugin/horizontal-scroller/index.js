import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { HorizontalScroller } from '@pagesComponent/horizontal-scroller/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').PageAsync} */
export const horizontalScroller = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    if (MobMotionCore.mq('max', 'medium')) {
        return htmlObject({
            content: [
                {
                    className: 'l-background-shape',
                    content: bg,
                },
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '',
        backRoute: '',
    });

    return htmlObject({
        content: {
            component: HorizontalScroller,
            modules: MobJs.staticProps(
                /** @type {import('@pagesComponent/horizontal-scroller/type').HorizontalScroller['props']} */
                ({
                    animatePin: false,
                })
            ),
        },
    });
};
