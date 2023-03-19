import { setStateById } from '../../baseComponent/componentStore/action';
import { createProps } from '../../baseComponent/mainStore';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;
    setStateById(id, 'counter', (prev) => prev + 1);
}

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

function addChildren({ children, getState }) {
    return children
        .map((_child, i) => {
            const childProps = createProps({
                valueFromParent: () => {
                    const { counter } = getState();
                    return counter * i;
                },
                i,
            });

            return `
                 <component data-props="${childProps}" data-cancellable data-component="TestComponent2">
            `;
        })
        .join('');
}
/**
 * Create component
 */
export const TestComponent = async ({
    props,
    getState,
    watch,
    render,
    onMount,
}) => {
    onMount(({ element }) => {
        element.addEventListener('click', onClick);
        const counterEl = element.querySelector('.counter');
        const unwatch = watch('counter', (val) => {
            counterEl.innerHTML = val;
        });

        return () => {
            unwatch();
            element.removeEventListener('click', onClick);
            element.remove();
        };
    });

    /**
     * Async test
     */
    await asyncTest();

    /**
     * Get props
     */
    const { label } = props;
    const { childNumbers, counter } = getState();
    const childArray = [...Array(childNumbers).keys()];

    return render(`
        <div>
            <button class="c-test-comp">
                <span>${label}</span>
                <span>
                    counter: <span class="counter">${counter}</span>
                </span>
            </button>
            ${addChildren({ children: childArray, getState })}
        </div>
    `);
};
