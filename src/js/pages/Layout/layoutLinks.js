import { html, MobJs } from '@mobJs';
import { LayoutLinks } from '../../component/pages/layoutLinks/definition';
import { loadJsonContent } from '../../utils/utils';

MobJs.useComponent([LayoutLinks]);

/** @type{import('@mobJsType').PageAsync} */
export const layoutLinksPage = async ({ props }) => {
    const { source } = props;
    const { data } = await loadJsonContent({ source });

    return html` <div class="l-links">
        <layout-links
            ${MobJs.staticProps({
                title: data.title,
                items: data.items,
            })}
        ></layout-links>
    </div>`;
};
