import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { htmlObject } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import {
    MatrioskaInvalidate,
    MatrioskaRepeat,
} from '@pagesComponent/matrioska/definition';

export const matrioska_repeat_page = () => {
    if (MobMotionCore.mq('max', 'tablet')) {
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
            component: MatrioskaRepeat,
        },
    });
};

export const matrioska_invalidate_page = () => {
    if (MobMotionCore.mq('max', 'tablet')) {
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
            component: MatrioskaInvalidate,
        },
    });
};
