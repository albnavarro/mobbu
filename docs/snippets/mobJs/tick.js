import { tick } from '../mobjs';

/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, bindEvents, bindProps, setState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
                    click: async (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                        await tick();

                        // All app is updated.
                    },
                })}
                ${bindProps({
                    bind: ['counter'],
                    props: ({ counter }) => {
                        return {
                            childProp: counter,
                        };
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
