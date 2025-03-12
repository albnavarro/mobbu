import { html } from '../../../mobjs';

/** @type{import("../../../mobjs/type").MobComponent} */
export const TestScssGridFn = () => {
    return html`
        <div class="test-grid">
            <div class="test-grid__grid">
                <span></span><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span><span></span
                ><span></span><span></span><span></span>
            </div>
            <div class="test-grid__cont"><span>test</span></div>
        </div>
    `;
};
