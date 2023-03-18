import { parseComponents } from '../../baseComponent/componentList';

export const homeModule = ({ root = document.createElement('div') }) => {
    const content = `
        <component data-component="TestComponent" data-test="instance 1">
            <component data-component="TestComponent" data-test="instance 2">
                <component data-component="TestComponent" data-test="instance 3">
                </component>
            </component>
        </component>

    `;

    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', content);
    parseComponents({ element: root });
};
