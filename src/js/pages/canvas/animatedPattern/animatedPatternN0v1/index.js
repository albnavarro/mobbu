import { html, staticProps } from '../../../../mobjs';

export const animatedPatternN0v1 = () => {
    return html`<div class="l-padding">
        <animatedpattern-n0></animatedpattern-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '#caterpillarN2',
                nextRoute: '#animatedPatternN0v2',
            })}
        ></quick-nav>
    </div>`;
};
