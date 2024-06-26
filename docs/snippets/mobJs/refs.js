/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount }) => {
    onMount(({ refs, ref }) => {
        const { list } = ref;
        const { list_item } = refs;

        console.log(list); // <ul>
        console.log(list_item); // [<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,<li>,]
    });

    return html`
        <div>
            <ul ref="list">
                <li ref="list_item">1</li>
                <li ref="list_item">2</li>
                <li ref="list_item">3</li>
                <li ref="list_item">4</li>
                <li ref="list_item">5</li>
                <li ref="list_item">6</li>
                <li ref="list_item">7</li>
                <li ref="list_item">8</li>
                <li ref="list_item">9</li>
            </ul>
        </div>
    `;
};
