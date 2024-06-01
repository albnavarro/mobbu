import { scrollerN1Def } from '../../../component/pages/scroller/ScrollerN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([scrollerN1Def]);

export const scrollerN1 = () => {
    return html`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`;
};
