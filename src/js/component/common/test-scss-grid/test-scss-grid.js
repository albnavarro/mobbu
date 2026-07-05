import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const TestScssGridFunction = () => {
    return htmlObject({
        content: /* HTML */ `
            <div class="test-grid">
                <div class="test-grid__grid">
                    <span></span><span></span><span></span><span></span
                    ><span></span><span></span><span></span><span></span
                    ><span></span><span></span><span></span><span></span>
                </div>
                <div class="test-grid__cont"><span>test</span></div>
            </div>
        `,
    });
};
