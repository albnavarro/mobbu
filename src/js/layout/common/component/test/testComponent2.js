import { createComponent } from '../../baseComponent/componentCreate';
import { watchById } from '../../baseComponent/componentStore';

/**
 * Create component
 */
export const TestComponent2 = (component) => {
    const { getProps, getParentId, render } = createComponent({
        component,
        className: ['c-test-comp__inner'],
        type: 'span',
    });

    const { jsProps } = getProps();

    watchById(getParentId(), 'stato1', (val) => {
        console.log(`parent component change: ${val}`);
    });

    return render(`${jsProps()}`);
};
