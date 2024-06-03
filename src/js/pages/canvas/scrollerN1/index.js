import { ScrollerN1 } from '../../../component/pages/scroller/ScrollerN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([ScrollerN1]);

export const scrollerN1 = () => {
    return html`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`;
};
