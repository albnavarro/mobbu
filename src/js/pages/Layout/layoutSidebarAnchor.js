import { DocContainer } from '../../component/common/docsContainer/definition';
import { DocTitle } from '../../component/common/doctitle/definition';
import { DocsTitleSmall } from '../../component/common/doctitleSmall/definition';
import { HtmlContent } from '../../component/common/htmlContent/definition';
import { ScrollTo } from '../../component/common/scrollTo/definition';
import { html, MobJs } from '../../mob/mobjs';
import { loadJsonContent } from '../../utils/utils';
import { getBreadCrumbs } from './utils';

MobJs.useComponent([
    DocContainer,
    DocsTitleSmall,
    ScrollTo,
    DocTitle,
    HtmlContent,
]);

/** @type{import('../../mob/mobjs/type').PageAsync<{},import('./type.d.ts').LayoutSidebarAnchor['props']>} */
export const layoutSidebarAnchor = async ({ props }) => {
    const { source, title, breadCrumbs } = props;
    const { data } = await loadJsonContent({ source });

    return html` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${MobJs.staticProps({
                    data: data.data,
                    useMaxWidth: true,
                })}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${getBreadCrumbs({
                        breadCrumbs,
                    })}<span>${title}</span>
                </div></doc-title-small
            >
            <scroll-to name="scrollTo" slot="section-links"></scroll-to>
            <doc-title slot="section-title">${title}</doc-title>
        </div>
    </doc-container>`;
};
