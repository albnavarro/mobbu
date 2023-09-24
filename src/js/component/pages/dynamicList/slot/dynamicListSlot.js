import { html } from '../../../../mobjs';

function getPreValue(value) {
    return html`<pre>${value}</pre>`;
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListSlot = ({ getState, html, onMount, watchSync }) => {
    const { staticFromSlot, staticFromComponent } = getState();

    onMount(({ element }) => {
        const tEl = element.querySelector('.js-t-state');
        const t2El = element.querySelector('.js-t2-state');

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
        <div class="dynamic-slot">
            <h3 class="dynamic-slot__label">Component inside slot</h3>
            <div>${staticFromSlot}</div>
            <div>${staticFromComponent}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div class="js-t-state"></div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div class="js-t2-state"></div>
        </div>
    `;
};
