import { htmlObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { LayoutLinks } from '@pagesComponent/layout-links/definition';
import { MobMotionCore } from '@mobMotion';
import { OnlyTablet } from '@commonComponent/only-tablet/definition';

/** @type {import('@mobJsType').PageAsync} */
export const layoutLinksPage = async ({ props }) => {
    if (MobMotionCore.mq('max', 'tablet')) {
        return htmlObject({
            content: [
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

    const { source } = props;
    const { data } = await loadJsonContent({ source });

    return htmlObject({
        tag: 'main',
        content: {
            component: LayoutLinks,
            modules: MobJs.staticProps(
                /** @type {import('@pagesComponent/layout-links/type').LayoutLinks['props']} */
                ({
                    title: data.title,
                    items: data.items,
                })
            ),
        },
    });
};
