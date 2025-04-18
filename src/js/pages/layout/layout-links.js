import { html, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { LayoutLinks } from '@pagesComponent/layout-links/definition';

MobJs.useComponent([LayoutLinks]);

/** @type {import('@mobJsType').PageAsync} */
export const layoutLinksPage = async ({ props }) => {
    const { source } = props;
    const { data } = await loadJsonContent({ source });

    return html` <div class="l-links">
        <layout-links
            ${MobJs.staticProps(
                /** @type {import('@pagesComponent/layout-links/type').LayoutLinks['state']} */
                ({
                    title: data.title,
                    items: data.items,
                })
            )}
        ></layout-links>
    </div>`;
};
