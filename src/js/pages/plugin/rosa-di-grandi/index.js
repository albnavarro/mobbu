import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { RosaDiGrandiPage } from '@pagesComponent/rosa-di-grandi/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').PageAsync} */
export const rosaDiGrandiRoute = async () => {
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
        prevRoute: '#math-animation-01',
        nextRoute: '',
        backRoute: '#plugin-overview',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: RosaDiGrandiPage,
        },
    });
};
