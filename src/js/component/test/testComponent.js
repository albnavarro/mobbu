import { componentStore } from '../../baseComponent/componentStore/store';
import { createProps } from '../../baseComponent/mainStore';
import { getUnivoqueByKey } from '../../baseComponent/updateList/utils';
import { addedData, originalData, removeData } from './data';

function logChildren(getChildren) {
    console.log(getChildren('TestComponent2'));
}

function debug() {
    componentStore.debugStore();
}

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

// const childProps = createProps({
//     valueFromParent: () => {
//         const { counter } = getState();
//         return counter * i;
//     },
// });

function addChildren({ data }) {
    return data
        .map(({ label }, index) => {
            const childProps = createProps({
                label,
                index,
            });

            return `
                 <component data-props="${childProps}" data-key="${label}" data-cancellable data-component="TestComponent2"/>
            `;
        })
        .join('');
}
/**
 * Create component
 */
export const TestComponent = async ({
    props,
    setState,
    getChildren,
    render,
    onMount,
    updateList,
    getState,
}) => {
    onMount(({ element }) => {
        const debugBtn = element.querySelector('.debug');
        const childrenBtn = element.querySelector('.children');
        const addEl = element.querySelector('.add');
        const removeEl = element.querySelector('.remove');

        const unwatchList = updateList({
            watch: 'data',
            container: element.querySelector('.c-test-comp__list'),
            component: 'TestComponent2',
            key: 'label',
            update: ({ current, setChildState, index }) => {
                const { label } = current;
                setChildState('label', label);
                setChildState('index', index);
            },
        });

        // setState('data', originalData);

        debugBtn.addEventListener('click', debug);
        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        addEl.addEventListener('click', () =>
            setState(
                'data',
                getUnivoqueByKey({ data: addedData, key: 'label' })
            )
        );
        removeEl.addEventListener('click', () =>
            setState(
                'data',
                getUnivoqueByKey({ data: removeData, key: 'label' })
            )
        );

        return () => {
            unwatchList();
            debugBtn.removeEventListener('click', debug);
            element.remove();
        };
    });

    /**
     * Async test
     */
    await asyncTest();

    /**
     * Set/Get state
     */
    setState('data', originalData);
    const { data } = getState();

    /**
     * Set props
     */
    const { title } = props;
    const outeProp = createProps({
        label: `outer list el`,
    });

    // test array
    return render(`
        <div class="c-test-comp">
            <div class="c-test-comp__label">
                <span>${title} : </span>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn add">
                    add
                </button>
                <button class="c-test-comp__btn remove">
                    remove
                </button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn debug">
                    debug
                </button>
                <button class="c-test-comp__btn children">
                    Children
                </button>
            </div>
            <div class="c-test-comp__list">
                 ${addChildren({ data, getState })}
            </div>
            <component data-props="${outeProp}" data-cancellable data-component="TestComponent2"></component>
        </div>
    `);
};
