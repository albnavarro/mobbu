import { html, staticProps } from '../../../mobjs';

export const mobMotion_parallax = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: './data/mobMotion/parallax.json',
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
