import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { ScrollerN1 } from '@pagesComponent/scroller/n1/definition';
import { loadTextContent } from '@utils/utils';

export const scrollerN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/rdp.svg?v=1.3',
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
        prevRoute: '#caterpillarN1',
        nextRoute: '#caterpillarN2',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: ScrollerN1,
            modules: MobJs.staticProps({ background: bg }),
        },
    });
};
