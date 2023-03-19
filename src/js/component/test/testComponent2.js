import { watchById } from '../../baseComponent/componentStore/action';

/**
 * Create component
 */
export const TestComponent2 = ({ props, getParentId, render, onMount }) => {
    const { valueFromParent, i } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');
        const unwatch = watchById(getParentId(), 'counter', () => {
            counterEl.innerHTML = valueFromParent();
        });

        return () => {
            unwatch();
            element.remove();
        };
    });

    return render(`
        <div class="c-test-comp__inner">
            <div>
                index: ${i}
            </div>
            <div>
                counter*i from parent:
                <span class="counter">${valueFromParent()}</span>
            </div>
        </div>
    `);
};
