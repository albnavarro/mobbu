import { staticProps } from '../../mobjs';

export const test = () => {
    return /* HTML */ `
        <DynamicList ${staticProps({ title: 'instance 1' })}> </DynamicList>
    `;
};
