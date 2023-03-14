import { createComponent } from '../../baseComponent/componentCreate';

/**
 * Create component
 */
export const createTestComponent2 = ({ component = null }) => {
    if (!component) return;

    const { render, getProps } = createComponent({
        component,
        className: ['c-test-comp__inner'],
        type: 'span',
    });

    const { jsProps } = getProps();
    render(`${jsProps()}`);
};
