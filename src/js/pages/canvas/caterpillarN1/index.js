import { html, staticProps } from '../../../mobjs';

export const caterpillarN1 = () => {
    return html`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
        <quick-nav
            ${staticProps({
                prevRoute: '#caterpillarN0',
                nextRoute: '#caterpillarN2',
            })}
        ></quick-nav>
    </div>`;
};
