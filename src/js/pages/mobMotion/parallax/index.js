import { docsContainerComponentDef } from '../../../component/common/docsContainer/definition';
import { docsTitleComponentDef } from '../../../component/common/doctitle/definition';
import { docsTitleSmallComponentDef } from '../../../component/common/doctitleSmall/definition';
import { htmlContentDef } from '../../../component/common/htmlContent/definition';
import { scrollToDef } from '../../../component/common/scrollTo/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

useComponent([
    docsContainerComponentDef,
    docsTitleSmallComponentDef,
    docsTitleComponentDef,
    htmlContentDef,
    scrollToDef,
]);

export const mobMotion_parallax = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobMotion/parallax.json',
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
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Parallax</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Parallax</doc-title>
    </doc-container>`;
};
