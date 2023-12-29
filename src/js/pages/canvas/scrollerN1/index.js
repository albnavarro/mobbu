import { html, staticProps } from '../../../mobjs';

export const scrollerN1 = () => {
    return html`<div class="l-padding">
        <caterpillar-n3></caterpillar-n3>
        <quick-nav
            ${staticProps({
                prevRoute: '#scrollerN0v4',
                nextRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
