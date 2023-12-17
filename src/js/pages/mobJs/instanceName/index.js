import { html, staticProps } from '../../../mobjs';

export const mobJs_instanceName = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: './data/mobJs/instanceName.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobJs_overview">mobjs</a> / <span>instanceName</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">InstanceName</doc-title>
    </doc-container>`;
};
