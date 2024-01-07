import { html, staticProps } from '../../../mobjs';

export const scrollerN1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Scroller N.1' })}
        ></animation-title>
        <caterpillar-n3></caterpillar-n3>
        <quick-nav
            ${staticProps({
                prevRoute: '#scrollerN0?version=4&activeId=4',
                nextRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
