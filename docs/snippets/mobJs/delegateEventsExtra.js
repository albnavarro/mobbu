<div>
    <button
        ${delegateEvents({
            click: (event, index) => {
                setState('counter', (value) => (value += 1));
                event.preventDefault(); 
            },
        })}
    >
        my button
    </button>
    <my-child-component
        ${delegateEvents({
            click: (event, index) => {
                setState('counter', (value) => (value += 1));
                event.preventDefault(); 
            },
            mousemove: (event, index) => {
                setState('counter', (value) => (value += 1));
            },
        })}
    ></my-child-component>
</div>
