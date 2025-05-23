import { DocContainer } from '@commonComponent/doc-container/definition';
import { DocTitle } from '@commonComponent/doc-title/definition';
import { DocsTitleSmall } from '@commonComponent/doc-title-small/definition';
import { HtmlContent } from '@commonComponent/html-content/definition';
import { ScrollTo } from '@commonComponent/scroll-to/definition';
import { html, MobJs } from '@mobJs';
import { loadJsonContent } from '@utils/utils';
import { scrollToName } from 'src/js/component/instance-name';

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
            ${MobJs.staticProps(
                /** @type {Partial<import('@commonComponent/html-content/type').HtmlContent['state']>} */
                ({
                    data: data.data,
                    useMaxWidth: true,
                })
            )}
        ></html-content>
        <doc-title-small slot="section-title-small">Canvas </doc-title-small>
        <scroll-to name="${scrollToName}" slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`;
};
