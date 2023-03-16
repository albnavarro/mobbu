import { watchById } from '../../baseComponent/componentStore';

/**
 * Create component
 */
export const TestComponent2 = ({ getProps, getParentId, render }) => {
    const { jsProps } = getProps();

    watchById(getParentId(), 'stato1', (val) => {
        console.log(`parent component change: ${val}`);
    });

    return render(`${jsProps()}`);
};
