import { staticProps } from '../../mobjs';

export const test = () => {
    return /* HTML */ `
        <TestComponent ${staticProps({ title: 'instance 1' })}> </TestComponent>
    `;
};
