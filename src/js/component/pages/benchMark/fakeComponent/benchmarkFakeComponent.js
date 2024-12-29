//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').BenchMarkFakeComponent>} */
export const BenchMarkFakeComponentFn = ({
    html,
    getProxi,
    bindProxi,
    delegateEvents,
    onMount,
    id,
}) => {
    let isSelected = false;
    let rootRef;

    const proxiState = getProxi();

    onMount(({ element }) => {
        rootRef = element;

        return () => {};
    });

    return html`<div class="benchmark-fake">
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${id}
        </div>
        <div class="benchmark-fake__row">
            ${bindProxi`<strong>index:</strong><br/> ${() => ({ bind: 'index', value: proxiState.index })}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindProxi`<strong>label:</strong><br/> ${() => ({ bind: 'label', value: proxiState.label })}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindProxi`<strong>counter: </strong><br/> ${() => ({ bind: 'counter', value: proxiState.counter })}`}
        </div>
        <div class="benchmark-fake__row">
            <button
                class="benchmark-fake__button"
                type="button"
                ${delegateEvents({
                    click: () => {
                        isSelected = !isSelected;
                        rootRef.classList.toggle('selected', isSelected);
                    },
                })}
            >
                Select
            </button>
        </div>
    </div> `;
};
