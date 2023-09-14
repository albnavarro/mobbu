/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListChildTest = async ({ render }) => {
    return render(/* HTML */ `
        <dynamic-list-child-test class="c-test4-comp"
            >comp 4</dynamic-list-child-test
        >
    `);
};
