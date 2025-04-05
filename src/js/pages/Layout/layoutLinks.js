import { LayoutLinks } from '../../component/pages/layoutLinks/definition';
import { html, MobJs } from '../../mob/mobjs';
import { loadJsonContent } from '../../utils/utils';

MobJs.useComponent([LayoutLinks]);

/** @type{import('../../mob/mobjs/type').PageAsync} */
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
