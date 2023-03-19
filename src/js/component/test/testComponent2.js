import { watchById } from '../../baseComponent/componentStore';

/**
 * Create component
 */
export const TestComponent2 = ({ props, getParentId, render }) => {
    const { jsProps } = props;

    watchById(getParentId(), 'stato1', (val) => {
        console.log(`parent component change: ${val}`);
    });

    return render(`
        <span class="c-test-comp__inner">
            ${jsProps()}
        </span>
    `);
};
