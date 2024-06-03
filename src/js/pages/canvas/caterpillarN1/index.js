import { CaterpillarN1 } from '../../../component/pages/canvas/caterpillarN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([CaterpillarN1]);

export const caterpillarN1 = () => {
    return html`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;
};
