# Simple Listen

Small utility for adding event listeners that returns the listener for easy unsubscribing

## Installation

```
$ npm install simple-listen
```

## Example

```js
import listen from 'simple-listen'

const clickableEl = document.getElementById('clickable');

const myListener = listen(clickableEl, 'click mouseenter mouseleave', (e) => {

    console.log(e.type);
});

myListener(); // unsubscribe

```

# License

Modified BSD
