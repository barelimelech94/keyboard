export class MyActionListener {
    // Init the class
    listeners = new Map();
    constructor() {}
    // registerListener registers a function to an action name. In case the action already exists, the new
    // listener should be added to the
    // already existing listeners
    // action - Action name
    // listener - Function to invoke upon action call
    registerListener(action, listener) {
        console.log(
            `${this.constructor.name} - registerListener called - action:${action}, listener:${listener.name}`
        );
        if (!this.listeners.has(action)) {
            this.listeners.set(action, []);
        }
        if (!this.listeners.get(action).includes(listener)) {
            this.listeners.get(action).push(listener);
        }
    }
    // When calling the removeListener all listeners are removed from the action
    // and the action itself is removed and can no longer be called.
    // action - the Action to remove
    removeListener(action) {
        console.log(`${this.constructor.name} - removeListener called - action:${action}`);
        this.listeners.delete(action);
    }
    // Invoke all registered listeners of the giving action with the passed data
    // In case the action is not registered,an exception thrown
    // action - The action name
    // data - The data to pass to all registered listeners as parameter
    emit(action, data) {
        console.log(`${this.constructor.name} - emit called - action:${action}, data:${data}`);
        if (!this.listeners.get(action)) {
            throw new Error(`Can't emit an event. Event "${action}" doesn't exits.`);
        }
        this.listeners.get(action).forEach((listener) => {
            listener(data);
        });
    }
}
