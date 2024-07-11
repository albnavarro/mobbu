/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, staticProps, onMount }) => {
    onMount(({ refs, ref }) => {
        const { list, myComponent } = ref;
        const { listItem } = refs;

        console.log(list); // <ul>
        console.log(listItem); // [<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,]
        console.log(myComponent); // first node of <my-component>
    });

    return html`
        <div>
            <ul ref="list">
                <li ref="listItem">1</li>
                <li ref="listItem">2</li>
                <li ref="listItem">3</li>
                <li ref="listItem">4</li>
                <li ref="listItem">5</li>
                <li ref="listItem">6</li>
                <li ref="listItem">7</li>
                <li ref="listItem">8</li>
                <li ref="listItem">9</li>
            </ul>
            <my-component ref="myComponent" ${staticProps({ prop: 'my-prop' })}>
                content
            </my-component>
        </div>
    `;
};
