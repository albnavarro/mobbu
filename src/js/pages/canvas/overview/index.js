import { DocContainer } from '../../../component/common/docsContainer/definition';
import { DocTitle } from '../../../component/common/doctitle/definition';
import { DocsTitleSmall } from '../../../component/common/doctitleSmall/definition';
import { HtmlContent } from '../../../component/common/htmlContent/definition';
import { ScrollTo } from '../../../component/common/scrollTo/definition';
import { html, MobJs } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

MobJs.useComponent([
    DocContainer,
    DocsTitleSmall,
    ScrollTo,
    DocTitle,
    HtmlContent,
]);

export const canvas_overview = async () => {
    const { data } = await loadJsonContent({
        source: './data/canvas/overview.json',
    });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${MobJs.staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small">Canvas </doc-title-small>
        <scroll-to name="scrollTo" slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`;
};
