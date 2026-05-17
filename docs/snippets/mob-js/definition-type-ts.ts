export const MyComponent = MobJs.createComponent<MyComponent>({
    tag: 'my-component',
    component: MyComponentFn,
    props: {
        active: {
            __value: false,
            __type: Boolean,
        },
    },
    state: {
        color: {
            __value: 'white',
            __type: String,
            __validate: (value) => {
                return ['white', 'black'].includes(value);
            },
        },
    },
});
