import { MathFunction } from "../math/MathFunction.mjs";

export class DebugInfo
{
    static ROOT = document.querySelector('body .container');

    #gameObject;
    #props;
    #id;

    constructor(gameObject, props, rect)
    {
        this.#gameObject = gameObject;
        this.#props = props;
        this.#id = MathFunction.uuid();

        this.widget(rect.x, rect.y, rect.width, rect.height);
        this.draggable();
    }

    draggable()
    {
        const dragElement = (element, dragzone, container) => {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
            const dragMouseUp = () => {
                document.onmouseup = null;
                document.onmousemove = null;
        
                element.classList.remove("drag");
            };
        
            const dragMouseMove = (event) => {
                event.preventDefault();
        
                pos1 = pos3 - event.clientX;
                pos2 = pos4 - event.clientY;
                pos3 = event.clientX;
                pos4 = event.clientY;
        
                const elementWidth = element.clientWidth;
                const elementHeight = element.clientHeight;

                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;

                const x = MathFunction.clamp(element.offsetLeft - pos1, 0, containerWidth - elementWidth);
                const y = MathFunction.clamp(element.offsetTop - pos2, 0, containerHeight - elementHeight);

                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            };
        
            const dragMouseDown = (event) => {
                event.preventDefault();
        
                pos3 = event.clientX;
                pos4 = event.clientY;
        
                element.classList.add("drag");
        
                document.onmouseup = dragMouseUp;
                document.onmousemove = dragMouseMove;
            };
        
            dragzone.onmousedown = dragMouseDown;
        };

        const item = document.querySelector(`[id='${this.#id}']`);
        const header = document.querySelector(`[id='${this.#id}'] .header`);

        dragElement(item, header, DebugInfo.ROOT);
    }

    widget(x, y, width, height)
    {
        const root = DebugInfo.ROOT;

        const item = document.createElement('div');
        item.id = this.#id;
        item.className = 'draggable debug-widget';
        item.style.position = 'absolute';
        item.style.right = `${x}px`;
        item.style.top = `${y}px`;
        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.font = '11px courier';

        const header = document.createElement('div');
        header.className = 'header';

        const text = document.createTextNode(this.#gameObject.constructor.name);
        header.append(text);

        const content = document.createElement('pre');
        content.className = 'content';

        this.#props.forEach(prop => {
            const textNode = document.createElement('div');
            textNode.className = 'text';
            textNode.style.padding = '0px 10px';
            content.append(textNode);
        });

        item.append(header);
        item.append(content);

        root.append(item);

        this.update();
    }

    update()
    {
        const text = document.querySelectorAll(`[id="${this.#id}"] .content .text`);
        this.#props.forEach((prop, index) => {
            text[index].textContent = `${prop} : ${this.#gameObject[prop]}`;
        });
    }
};