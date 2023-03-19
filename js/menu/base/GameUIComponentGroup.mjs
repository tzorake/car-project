export class GameUIComponentGroup
{
    constructor({ components = [], callbacks = {}, parent = null })
    {
        this.parent = parent;
        
        this.components = components;

        this.components.forEach(component => {
            const tuples = Object.entries(callbacks);

            tuples.forEach(([name, func]) => {
                component.callbacks[name] = func;
            });

            component.parent = this;
        });
    }

    update(dt)
    {
        this.components.forEach(component => {
            component.update(dt);
        });
    }

    render(dt)
    {
        this.components.forEach(component => {
            component.render(dt);
        });
    }

    connect()
    {
        this.components.forEach(component => {
            component.connect();
        });
    }

    disconnect()
    {
        this.components.forEach(component => {
            component.disconnect();
        });
    }
};