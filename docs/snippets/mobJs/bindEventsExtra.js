<my-child-component
    ${bindEvents({
        click: (event, value, index) => {
            setState('counter', (value) => (value += 1));
            event.preventDefault(); 
        },
        onmouseenter: (event, value, index) => {
            setState('counter', (value) => (value += 1));
        },
    })}
></my-child-component>
