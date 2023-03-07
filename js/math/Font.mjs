export class Font
{
    constructor(size, family)
    {
        this.size = size;
        this.family = family;
    }

    get font()
    {
        return `${this.size}px ${this.family}`;
    }
};