let iota = 0;
export const EventListenerType = {};
EventListenerType.KEYDOWN   = iota++;
EventListenerType.KEYUP     = iota++;
EventListenerType.MOUSEDOWN = iota++;
EventListenerType.MOUSEMOVE = iota++;
EventListenerType.MOUSEUP   = iota++;

const EventListenerMapping = {};
EventListenerMapping[EventListenerType.KEYDOWN]   = 'keydown';
EventListenerMapping[EventListenerType.KEYUP]     = 'keyup';
EventListenerMapping[EventListenerType.MOUSEDOWN] = 'mousedown';
EventListenerMapping[EventListenerType.MOUSEMOVE] = 'mousemove';
EventListenerMapping[EventListenerType.MOUSEUP]   = 'mouseup';

export class Callback {
    constructor(id, callback)
    {
        this.id = id;
        this.callback = callback;
    }
};

export class GlobalGameController
{
    constructor()
    {
        this.callbacks = {};
    }

    addCallback(type, id, callback)
    {
        const isExists = type in EventListenerMapping;

        if (!isExists)
        {
            throw new Error('GlobalGameController.addCallback(type, callback) : There is no such type.');
        }

        const isEmpty = this.callbacks[type] === undefined;

        if (isEmpty)
        {
            this.callbacks[type] = {};
        }

        const storage = this.callbacks[type];

        storage[id] = callback;
    }

    removeCallback(type, id, callback)
    {
        const callbacks = this.callbacks;
        const isExists = type in EventListenerMapping;

        if (!isExists)
        {
            throw new Error('GlobalGameController.removeCallback(type, callback) : There is no such type.');
        }

        const isEmpty = !!Object.keys(callbacks[type]).length;

        if (isEmpty)
        {
            callbacks[type] = {};
        }

        const storage = callbacks[type];

        if (id in storage)
        {
            const { id, ...rest } = storage;
            callbacks[type] = rest;
        }
    }

    connect()
    {
        const tuples = Object.entries(EventListenerMapping);

        tuples.forEach(([type, listener]) => {
            document.addEventListener(listener, event => {
                if (this.callbacks[type])
                {
                    const tuples =  Object.entries(this.callbacks[type]);

                    tuples.forEach(([_, callback]) => {
                        callback(event);
                    });
                }
            });
        });
    }

    disconnect()
    {
        const tuples = Object.entries(EventListenerMapping);

        tuples.forEach(([type, listener]) => {
            document.removeEventListener(listener, event => {
                if (this.callbacks[type])
                {
                    const tuples =  Object.entries(this.callbacks[type]);
                    
                    tuples.forEach(([_, callback]) => {
                        callback(event);
                    });
                }
            });
        });
    }
};