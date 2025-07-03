/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const MyComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MyComponentType>} */
    ({
        tag: 'my-component',
        component: MyComponentFn,
        exportState: ['color', 'active'],
        state: {
            color: () => ({
                value: 'white',
                type: String,
                validate: (value) => {
                    return ['white', 'black'].includes(value);
                },
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
