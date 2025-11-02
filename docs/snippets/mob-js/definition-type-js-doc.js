/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const MyComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MyComponent>} */
    ({
        tag: 'my-component',
        component: MyComponentFn,
        props: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
        state: {
            color: () => ({
                value: 'white',
                type: String,
                validate: (value) => {
                    return ['white', 'black'].includes(value);
                },
            }),
        },
    })
);
