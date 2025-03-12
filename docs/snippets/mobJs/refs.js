import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent}
 */
export const MyComponent = ({
    staticProps,
    onMount,
    setRef,
    getRef,
    getRefs,
}) => {
    onMount(() => {
        const { list, myComponent } = getRef();
        const { listItem } = getRefs();

        console.log(list); // <ul>
        console.log(listItem); // [<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,]
        console.log(myComponent); // first node of <my-component>
    });

    return html`
        <div>
            <ul ref="list">
                <li ${setRef('listItem')}>1</li>
                <li ${setRef('listItem')}>2</li>
                <li ${setRef('listItem')}>3</li>
                <li ${setRef('listItem')}>4</li>
                <li ${setRef('listItem')}>5</li>
                <li ${setRef('listItem')}>6</li>
                <li ${setRef('listItem')}>7</li>
                <li ${setRef('listItem')}>8</li>
                <li ${setRef('listItem')}>9</li>
            </ul>
            <my-component
                ${setRef('myComponent')}
                ${staticProps({ prop: 'my-prop' })}
            >
                content
            </my-component>
        </div>
    `;
};
