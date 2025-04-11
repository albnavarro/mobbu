<div>
    <button
        ${delegateEvents({
            click: (event, value, index) => {
                updateState('counter', (value) => (value += 1));
                event.preventDefault(); 
            },
        })}
    >
        my button
    </button>
    <my-child-component
        ${delegateEvents({
            click: (event, value, index) => {
                updateState('counter', (value) => (value += 1));
                event.preventDefault(); 
            },
            mousemove: (event, value, index) => {
                updateState('counter', (value) => (value += 1));
            },
        })}
    ></my-child-component>
</div>
