export class Circle
{
    constructor(cx, cy, r)
    {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    intersects(circle)
    {
        return (this.cx - circle.cx)*(this.cx - circle.cx) + (this.cy - circle.cy)*(this.cy - circle.cy) < (this.r + circle.r)*(this.r + circle.r);
    }
}