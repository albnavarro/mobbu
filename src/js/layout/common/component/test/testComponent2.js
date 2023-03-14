import { createComponent } from '../../baseComponent/componentCreate';
import { watchById } from '../../baseComponent/componentStore';

/**
 * Create component
 */
export const createTestComponent2 = async ({ component = null }) => {
    if (!component) return;

    const { getProps, getParentId, render } = await createComponent({
        component,
        className: ['c-test-comp__inner'],
        type: 'span',
    });

    const { jsProps } = getProps();

    watchById(getParentId(), 'stato1', (val) => {
        console.log(`parent component change: ${val}`);
    });

    await render(`${jsProps()}`);
};
