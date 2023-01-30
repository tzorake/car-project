export class MathFunction
{
    static clamp = (x, minimum, maximum) => {
        if (x < minimum)
            x = minimum;
        else if (x > maximum)
            x = maximum;
        return x;
    }

    static uuid = () => {
        let u = '', m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', i = 0, rb = Math.random() * 0xffffffff | 0;
        while(i++ < 36) 
        {
            const c = m[i-1], r = rb&0xf, v = c == 'x' ? r : (r & 0x3 | 0x8);
            u += (c == '-' || c == '4') ? c : v.toString(16); rb = i % 8 == 0 ? Math.random() * 0xffffffff | 0 : rb >> 4;
        }
        return u;
    }

    static lerp(a, b, t) 
    {
        return a + t * (b - a);
    }

    static interp(x0, x, y)
    {
        for (let i = 0; i < x.length - 1; ++i)
        {
            if (x[i] <= x0 && x0 <= x[i + 1])
            {
                return MathFunction.lerp(y[i], y[i + 1], (x0 - x[i]) / (x[i+1] - x[i]));
            }
        }
        throw new Error(`MathFunction.interp(x0, x, y) : A value (${x0}) in x is below the interpolation range\'s minimum value (${Math.min(...x)}).`);
    }

    static range(n)
    {
        return [...new Array(n).keys()]
    }

    static linspace(start, stop, n)
    {
        if (n == 1) return stop;
        const h = (stop - start) / (n - 1);
        return MathFunction.range(n).map(i => start + h * i);
    }
}
