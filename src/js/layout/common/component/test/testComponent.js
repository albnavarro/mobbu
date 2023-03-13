import {
    registerComponent,
    componentStore,
    getPropsById,
    getStateById,
    setStateById,
} from '../../baseComponent/componentStore';
import { createComponent } from '../../baseComponent/componentCreate';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const { id } = target.dataset;

    /**
     * TEST !
     */
    const props = getPropsById(id);
    const { stato1, stato2 } = getStateById(id);
    const { test } = props;
    console.log('props', test);
    console.log('states', stato1, stato2);
    setStateById(id, 'stato1', (prev) => prev + 1);
    componentStore.debugStore();
}

/**
 * Add handler.
 */
function addHandler({ element }) {
    element.addEventListener('click', onClick);
}

/**
 * Destroy function.
 */
function destroyComponent({ id }) {
    const element = document.querySelector(`[data-id=${id}]`);
    if (!element) return;

    element.removeEventListener('click', onClick);
    element.remove();
}

/**
 * Create component
 */
export const createTestComponent = ({ component = null }) => {
    if (!component) return;

    const { element, props, id } = createComponent({
        component,
        className: ['c-test-comp'],
        content: '',
        type: 'button',
    });

    const { getProps, getState, setState, watch } = registerComponent({
        component,
        element,
        props,
        state: {
            stato1: () => ({
                value: 0,
                type: Number,
            }),
            stato2: () => ({
                value: 0,
                type: Number,
            }),
        },
        destroy: () => destroyComponent({ id }),
        id,
    });

    addHandler({ element });

    /**
     * TEST !
     */
    const { test } = getProps();
    console.log(test);
    // // //
    // setState('stato1', 20);
    // const { stato1: stato1Test } = getState();
    // console.log('stato1Test:', stato1Test);
    // //
    // watch('stato1', (newVal, oldVal) => {
    //     console.log('watch stato1', newVal, oldVal);
    // });
};
