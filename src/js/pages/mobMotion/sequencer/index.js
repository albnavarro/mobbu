import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobMotion_sequencer = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobMotion/sequencer.json',
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
            <span>Sequencer</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sequencer</doc-title>
    </doc-container>`;
};
