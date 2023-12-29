import { html, staticProps } from '../../../../mobjs';

export const scrollerN0v1 = () => {
    return html`<div>
        <animation-title
            ${staticProps({ title: 'Scroller N.0 v1' })}
        ></animation-title>
        <scroller-n0></scroller-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '#animatedPatternN1',
                nextRoute: '#scrollerN0v2',
            })}
        ></quick-nav>
    </div>`;
};
