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

export class GlobalGameController
{
    constructor()
    {
        this.callbacks = [];
    }

    addCallback(type, callback)
    {
        const typeExists = type in EventListenerMapping;

        if (!typeExists)
        {
            throw new Error('GlobalGameController.addCallback(type, callback) : There is no such type.');
        }

        const isDefined = this.callbacks[type] instanceof Array;

        if (!isDefined)
        {
            this.callbacks[type] = [];
        }

        this.callbacks[type].push(callback);
    }

    removeCallback(type, callback)
    {
        const typeExists = type in EventListenerMapping;

        if (!typeExists)
        {
            throw new Error('GlobalGameController.removeCallback(type, callback) : There is no such type.');
        }

        this.callbacks[type] = this.callbacks[type].filter(item => item !== callback);
    }

    connect()
    {
        Object.entries(EventListenerMapping).forEach(([type, listener]) => {
            document.addEventListener(listener, event => {    
                if (this.callbacks[type])
                {
                    this.callbacks[type].forEach(callback => {
                        callback(event);
                    });
                }
            });
        });
    }

    disconnect()
    {
        Object.entries(EventListenerMapping).forEach(([type, listener]) => {
            document.removeEventListener(listener, event => {    
                if (this.callbacks[type])
                {
                    this.callbacks[type].forEach(callback => {
                        callback(event);
                    });
                }
            });
        });
    }
};