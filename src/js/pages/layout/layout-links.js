import { fromObject, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { LayoutLinks } from '@pagesComponent/layout-links/definition';

MobJs.useComponent([LayoutLinks]);

/** @type {import('@mobJsType').PageAsync} */
export const layoutLinksPage = async ({ props }) => {
    const { source } = props;
    const { data } = await loadJsonContent({ source });

    return fromObject({
        component: LayoutLinks,
        modules: MobJs.staticProps(
            /** @type {import('@pagesComponent/layout-links/type').LayoutLinks['props']} */
            ({
                title: data.title,
                items: data.items,
            })
        ),
    });
};
