import { DocContainer } from '../../../component/common/docsContainer/definition';
import { DocTitle } from '../../../component/common/doctitle/definition';
import { docsTitleSmallComponentDef } from '../../../component/common/doctitleSmall/definition';
import { htmlContentDef } from '../../../component/common/htmlContent/definition';
import { scrollToDef } from '../../../component/common/scrollTo/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

useComponent([
    DocContainer,
    docsTitleSmallComponentDef,
    DocTitle,
    htmlContentDef,
    scrollToDef,
]);

export const mobJs_runtime = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobJs/runtime.json',
    });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>runtime</span>
        </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Runtime</doc-title>
    </doc-container>`;
};
