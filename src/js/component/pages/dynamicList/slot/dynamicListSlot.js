import { html } from '../../../../mobjs';

function getPreValue(value) {
    return html`<pre>${value}</pre>`;
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListSlot = ({ getState, html, onMount, watchSync }) => {
    const { staticFromSlot, staticFromComponent } = getState();

    onMount(({ refs }) => {
        const { tEl, t2El } = refs;

        watchSync('parentParentState', (val) => {
            tEl.textContent = '';
            tEl.insertAdjacentHTML('afterbegin', getPreValue(val));
        });

        watchSync('parentState', (val) => {
            t2El.textContent = '';
            t2El.insertAdjacentHTML('afterbegin', getPreValue(val));
        });
    });

    return html`
        <div class="c-dynamic-slot">
            <h3 class="c-dynamic-slot__label">Component inside slot</h3>
            <div>${staticFromSlot}</div>
            <div>${staticFromComponent}</div>
            <h3 class="c-dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div ref="tEl"></div>
            <h3 class="c-dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div ref="t2El"></div>
        </div>
    `;
};
