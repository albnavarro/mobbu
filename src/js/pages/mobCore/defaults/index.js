import { html, staticProps } from '../../../mobjs';
import { loadJsonContent, loadTextContent } from '../../../utils/utils';

export const mobCore_defaults = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobCore/defaults.json',
    });

    const { data: svg } = await loadTextContent({
        source: './asset/svg/logo.svg',
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
            ><a href="./#mobCore_overview">mobCore</a> / <span>Defaults</span>
        </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
        <m-logo-1 ${staticProps({ svg })}></m-logo-1>
    </doc-container>`;
};
