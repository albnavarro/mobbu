import { MobJs, htmlObject } from '@MobJs';

MobJs.useComponent([Header, Footer]);

export const wrapper = async () => {
    return htmlObject({
        content: [
            {
                component: Header,
            },
            {
                component: Footer,
            },
        ],
    });
};
