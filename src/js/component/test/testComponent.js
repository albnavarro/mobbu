import { componentStore } from '../../baseComponent/componentStore/store';
import { createProps } from '../../baseComponent/mainStore/actions/props';
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
            props: ({ current }) => {
                return { label: () => current?.label };
            },
            // props: ({ current, index }) => {
            //     return {
            //         label: () => {
            //             const { data } = getState();
            //             return data?.[index]?.label;
            //         },
            //     };
            // },
            updateState: ({ current, index, setChildState }) => {
                //  setChildState('myProp', current?.label)
                setChildState('index', index);
            },
        });

        setState('data', originalData);

        debugBtn.addEventListener('click', debug);
        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        addEl.addEventListener('click', () => setState('data', addedData));
        removeEl.addEventListener('click', () => setState('data', removeData));

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
     * Set props
     */
    const { title } = props;
    const outeProp = createProps({
        label: () => `outer list el`,
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
            </div>
            <component data-props="${outeProp}" data-cancellable data-component="TestComponent2"></component>
        </div>
    `);
};
