//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').BenchMarkFakeComponent>} */
export const BenchMarkFakeComponentFn = ({
    html,
    bindText,
    delegateEvents,
    onMount,
}) => {
    let isSelected = false;
    let rootRef;

    onMount(({ element }) => {
        rootRef = element;

        return () => {};
    });

    return html`<div class="benchmark-fake">
        <div class="benchmark-fake__row">
            ${bindText`<strong>label:</strong><br/> ${'label'}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindText`<strong>counter: </strong><br/> ${'counter'}`}
        </div>
        <div class="benchmark-fake__row">
            <div>
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
        </div>
    </div> `;
};
