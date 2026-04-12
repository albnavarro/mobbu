import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { fromObject, MobJs } from '@mobJs';
import { HorizontalScroller } from '@pagesComponent/horizontal-scroller/definition';

MobJs.useComponent([HorizontalScroller]);

/** @type {import('@mobJsType').PageAsync} */
export const horizontalScroller = async () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '',
        backRoute: '',
    });

    return fromObject({
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
