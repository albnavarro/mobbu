export const homeModule = () => {
    return `
        <component data-component="TestComponent" data-cancellable data-test="instance 1">
            <component data-component="TestComponent" data-cancellable data-test="instance 2">
                <component data-component="TestComponent" data-cancellable data-test="instance 3">
                </component>
            </component>
        </component>
    `;
};
