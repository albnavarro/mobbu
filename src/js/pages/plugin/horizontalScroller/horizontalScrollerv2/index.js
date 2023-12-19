import { html, staticProps } from '../../../../mobjs';

export const horizontalScrollerV2 = () => {
    return html`<div>
        <horizontal-scroller
            ${staticProps({ animatePin: true })}
        ></horizontal-scroller>
    </div>`;
};
