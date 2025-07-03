export const MyComponent = MobJs.createComponent<MyComponentType>({
    tag: 'my-component',
    component: MayComponentFn,
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
});
