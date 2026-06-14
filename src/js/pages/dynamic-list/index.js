import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { htmlObject } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { DynamicList } from '@pagesComponent/dynamic-list/definition';

export const dynamic_list = () => {
    if (MobMotionCore.mq('max', 'medium')) {
        return htmlObject({
            content: [
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

    return htmlObject({
        tag: 'main',
        content: {
            component: DynamicList,
        },
    });
};
