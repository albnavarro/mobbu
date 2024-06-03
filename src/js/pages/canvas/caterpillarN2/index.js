import { CaterpillarN2 } from '../../../component/pages/canvas/caterpillarN2/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([CaterpillarN2]);

export const caterpillarN2 = () => {
    return html`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;
};
