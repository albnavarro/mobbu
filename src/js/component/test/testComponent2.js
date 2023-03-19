import { watchById } from '../../baseComponent/componentStore/action';
import { componentStore } from '../../baseComponent/componentStore/store';

/**
 * Create component
 */
export const TestComponent2 = ({ props, getParentId, render }) => {
    const { jsProps } = props;

    watchById(getParentId(), 'stato1', (val) => {
        console.log(`parent component change: ${val}`);
        componentStore.debugStore();
    });

    return render(`
        <span class="c-test-comp__inner">
            ${jsProps()}
        </span>
    `);
};
