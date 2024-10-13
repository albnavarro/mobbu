import { BenchMarkInvalidate } from '../../component/pages/benchMark/invalidate/definition';
import { html, useComponent } from '../../mobjs';

useComponent([BenchMarkInvalidate]);

export const benchMark = async ({ props }) => {
    const { rootComponent } = props;
    console.log(rootComponent);

    return html`<div class="l-benchMark"><${rootComponent}></${rootComponent}></div>`;
};
