import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { htmlObject } from '@mobJs';
import { MobMotionCore } from '@mobMotion';

/** @type {import('@mobJsType').PageAsync} */
export const benchMark = async ({ props }) => {
    if (MobMotionCore.mq('max', 'tablet')) {
        return htmlObject({
            content: [
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

    const { rootComponent } = props;

    return htmlObject({
        tag: 'main',
        content: {
            tag: rootComponent,
        },
    });
};
