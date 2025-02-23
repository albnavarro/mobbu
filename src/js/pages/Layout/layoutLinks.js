import { LayoutLinks } from '../../component/pages/layoutLinks/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadJsonContent } from '../../utils/utils';

useComponent([LayoutLinks]);

/** @type{import('../../mobjs/type').PageAsync} */
export const layoutLinksPage = async ({ props }) => {
    const { source } = props;
    const { data } = await loadJsonContent({ source });

    return html` <div class="l-links">
        <layout-links
            ${staticProps({
                title: data.title,
                items: data.items,
            })}
        ></layout-links>
    </div>`;
};
