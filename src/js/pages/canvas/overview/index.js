import { DocContainer } from '@commonComponent/docsContainer/definition';
import { DocTitle } from '@commonComponent/doctitle/definition';
import { DocsTitleSmall } from '@commonComponent/doctitleSmall/definition';
import { HtmlContent } from '@commonComponent/htmlContent/definition';
import { ScrollTo } from '@commonComponent/scrollTo/definition';
import { html, MobJs } from '@mobJs';
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
