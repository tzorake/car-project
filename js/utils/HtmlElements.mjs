const BODY = document.querySelector('body');
const CANVAS = document.querySelector('.canvas');
const CONTEXT = CANVAS.getContext('2d');
const SCALE = 10;

export class HtmlElements
{
    static get BODY() 
    {
        return BODY;
    }

    static get CANVAS() 
    {
        return CANVAS;
    }

    static get CONTEXT() 
    {
        return CONTEXT;
    }

    static get SCALE() 
    {
        return SCALE;
    }
};