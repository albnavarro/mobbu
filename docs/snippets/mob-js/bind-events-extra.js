<my-child-component
    ${bindEvents({
        click: (event, value, index) => {
            updateState('counter', (value) => (value += 1));
            event.preventDefault(); 
        },
        onmouseenter: (event, value, index) => {
            updateState('counter', (value) => (value += 1));
        },
    })}
></my-child-component>
