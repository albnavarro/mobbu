export const MyComponent = MobJs.createComponent<MyComponent>({
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
});
