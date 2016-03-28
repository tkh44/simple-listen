/**
 * Utility for adding event listeners that returns the listener for easy unsubscribing
 *
 *
 * @param {HTMLElement} el
 * @param {string|string[]} types
 * @callback {function} cb
 * @callback {object=null} context
 * @returns {function()} unsubscribe
 */

export default (el, types, cb, context = null) => {

    const events = typeof types === 'string' ?
                         types.split(' ').map((t) => t.trim()) :
                         types;

    const boundCallback = cb.bind(context);
    const subs = events.map((type) => {

        el.addEventListener(type, boundCallback);
        return type;
    });

    const unsubscribe = () => {

        subs.forEach((type) => el.removeEventListener(type, boundCallback))
    };

    return unsubscribe;
};
