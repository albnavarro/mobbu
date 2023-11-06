import { html, staticProps } from '../../../mobjs';

export const mobMotion_sequencer = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/sequencer.json' })}
    ></html-content>`;
};
