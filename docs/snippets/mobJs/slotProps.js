/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyLayout = ({ html, staticProps, bindProps }) => {
    return html`
        <section>
            <mobjs-slot
                ${staticProps({
                    staticFromSlot: `static prop from layout`,
                })}
                ${bindProps({
                    bind: ['mylayoutState'],
                    props: ({ mylayoutState }) => {
                        return {
                            propFromLayout: mylayoutState,
                        };
                    },
                })}
            ></mobjs-slot>
        </section>
    `;
};

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, bindProps }) => {
    return html`
        <my-layout>
            <my-child
                ${bindProps({
                    bind: ['myState'],
                    props: ({ myState }) => {
                        return {
                            childState: myState,
                        };
                    },
                })}
            ></my-child>
        </my-layout>
    `;
};
