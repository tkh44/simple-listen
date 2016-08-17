# Simple Listen

Small utility for adding event listeners that returns the listener for easy unsubscribing

## Installation

```
$ npm install simple-listen
```

##API

###`listen(el, events, cb, capture, context)`

- `el` - the DOM element you are attaching events to
- `events` - [string|array[string]] - the event types to attach
- `cb` - [function] - the function to call when event fires
- `capture` - [boolean] - `false` - use capture
- `context` - [object] - `null` - the context applied to `cb`

## Example

```js
import listen from 'simple-listen'

const el = document.getElementById('clickable');
const callback = (e) => console.log(e.type);

const myListener = listen(el, 'click mouseenter mouseleave', callback);
myListener(); // remove event listener

// Multiple listeners
const listeners = [];
listeners.push(listen(el, 'click', callback));
listeners.push(listen(el, 'mouseenter', callback));
listeners.push(listen(el, 'mouseleave', callback));
listeners.push(listen(window, 'scroll', callback));
listeners.push(listen(window, 'resize', callback));

// quickly remove the event listeners
listeners.forEach((listener) => listener());
```

# License

Modified BSD
