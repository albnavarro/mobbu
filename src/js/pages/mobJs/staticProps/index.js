import { html, staticProps } from '../../../mobjs';

export const mobJs_staticProps = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/staticProps.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>staticProps</span></doc-title-small
        >
        <doc-title slot="section-title">staticProps</doc-title>
    </doc-container>`;
};
