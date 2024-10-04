import { DocContainer } from '../../component/common/docsContainer/definition';
import { DocTitle } from '../../component/common/doctitle/definition';
import { DocsTitleSmall } from '../../component/common/doctitleSmall/definition';
import { HtmlContent } from '../../component/common/htmlContent/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadJsonContent } from '../../utils/utils';

useComponent([DocContainer, DocsTitleSmall, DocTitle, HtmlContent]);

const getBreadCrumbs = ({ breadCrumbs }) =>
    breadCrumbs
        .map((item) => html` <a href="${item.url}">${item.title}</a> / `)
        .join('');

export const layoutSidebarLinks = async ({ props }) => {
    const { source, title, breadCrumbs } = props;
    const { data } = await loadJsonContent({ source });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >${getBreadCrumbs({
                breadCrumbs,
            })}<span>${title}</span></doc-title-small
        >
        <doc-title slot="section-title">${title}</doc-title>
    </doc-container>`;
};
