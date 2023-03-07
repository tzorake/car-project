export class GameUIComponentGroup
{
    constructor({ components, parent })
    {
        this.parent = parent;
        
        this.components = components;
        this.components.forEach(component => {
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
        throw new Error('GameUIComponentGroup.connect() is not implemented yet.');
    }

    disconnect()
    {
        throw new Error('GameUIComponentGroup.disconnect() is not implemented yet.');
    }
};