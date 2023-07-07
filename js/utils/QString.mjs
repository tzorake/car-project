function digitValue(char) {
    if (/\d/.test(char)) {
        return parseInt(char, 10);
    }
    return -1;
}

function memcpy(dest, src, count) {
    const di = dest.index;
    const dd = dest.data;
    const si = src.index;
    const sd = src.data;

    console.assert(di >= 0 && di < dd.length);
    console.assert(si >= 0 && si < sd.length);

    for (let i = 0; i < count; ++i) {
        dd[di + i] = sd[si + i];
    }
}

function findArgEscapes(s) {
    s = s.data;
    const length = s.length;

    const d = {
        min_escape: Number.MAX_SAFE_INTEGER,
        occurrences: 0,
        escape_len: 0,
    };

    let c = 0;
    while (c !== length) {
        while (c !== length && s[c] !== '%') {
            ++c;
        }

        if (c === length) {
            break;
        }
        const escape_start = c;
        if (++c === length) {
            break;
        }
        if (digitValue(s[c]) === -1) {
            continue;
        }

        let escape = digitValue(s[c]);
        ++c;

        if (c !== length && digitValue(s[c]) !== -1) {
            escape = (10 * escape) + digitValue(s[c]);
            ++c;
        }

        if (escape > d.min_escape) {
            continue;
        }

        if (escape < d.min_escape) {
            d.min_escape = escape;
            d.occurrences = 0;
            d.escape_len = 0;
        }

        ++d.occurrences;
        d.escape_len += c - escape_start;
    }
    return d;
}

function replaceArgEscapes(s, d, arg) {
    s = s.data;
    const length = s.length;

    const result_len =
        length -
        d.escape_len +
        d.occurrences *
        arg.length;

    const result = new Array(result_len);

    let rc = 0;
    let c = 0;
    let repl_cnt = 0;

    while (c !== length) {
        const text_start = c;

        while (s[c] !== '%') {
            ++c;
        }

        const escape_start = c++;

        let escape = digitValue(s[c]);
        if (escape !== -1) {
            if (c + 1 !== length && digitValue(s[c + 1]) !== -1) {
                escape = 10 * escape + digitValue(s[c + 1]) !== -1;
                ++c;
            }
        }

        if (escape !== d.min_escape) {
            memcpy({ index: rc, data: result }, { index: text_start, data: s }, c - text_start);
            rc += c - text_start;
        } else {
            ++c;

            memcpy({ index: rc, data: result }, { index: text_start, data: s }, escape_start - text_start);
            rc += escape_start - text_start;

            memcpy({ index: rc, data: result }, { index: 0, data: arg }, arg.length);
            rc += arg.length;

            if (++repl_cnt === d.occurrences) {
                memcpy({ index: rc, data: result }, { index: c, data: s }, length - c);
                rc += length - c;
                console.assert(rc === result_len);
                c = length;
            }
        }
    }

    console.assert(rc === result_len);
    return result.join('');
}

export class QString 
{
    constructor() 
    {
        if (arguments.length === 0) {
            this.data = '';
        }
        
        if (arguments.length === 1) {
            this.data = arguments[0];
        }
    }

    arg(a) 
    {
        a = new String(a);
        const d = findArgEscapes(this);

        if (d.occurrences == 0) {
            console.warn(`QString::arg: Argument missing: ${this.data}, ${a}`);
            return this;
        }
        this.data = replaceArgEscapes(this, d, a);

        return this;
    }

    toString() {
        return this.data;
    }
};

