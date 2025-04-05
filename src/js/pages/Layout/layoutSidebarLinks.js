import { DocContainer } from '@commonComponent/docsContainer/definition';
import { DocTitle } from '@commonComponent/doctitle/definition';
import { DocsTitleSmall } from '@commonComponent/doctitleSmall/definition';
import { HtmlContent } from '@commonComponent/htmlContent/definition';
import { html, MobJs } from '@mobJs';
import { loadJsonContent } from '../../utils/utils';
import { getBreadCrumbs } from './utils';

MobJs.useComponent([DocContainer, DocsTitleSmall, DocTitle, HtmlContent]);

/** @type{import('@mobJsType').PageAsync} */
export const layoutSidebarLinks = async ({ props }) => {
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
            <doc-title slot="section-title">${title}</doc-title>
        </div>
    </doc-container>`;
};
