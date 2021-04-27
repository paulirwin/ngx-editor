// :: MarkSpec A link. Has `href` and `title` attributes. `title`
// defaults to the empty string. Rendered and parsed as an `<a>`
// element.
const link = {
    attrs: {
        href: {},
        title: { default: null },
        target: { default: '_blank' }
    },
    inclusive: false,
    parseDOM: [
        {
            tag: 'a[href]',
            getAttrs(dom) {
                return {
                    href: dom.getAttribute('href'),
                    title: dom.getAttribute('title'),
                    target: dom.getAttribute('target'),
                };
            }
        }
    ],
    toDOM(node) {
        const { href, title, target } = node.attrs;
        return ['a', { href, title, target }, 0];
    }
};
// :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
// Has parse rules that also match `<i>` and `font-style: italic`.
const em = {
    parseDOM: [
        { tag: 'i' },
        { tag: 'em' },
        { style: 'font-style=italic' }
    ],
    toDOM() {
        return ['em', 0];
    }
};
// :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
// also match `<b>` and `font-weight: bold`.
const strong = {
    parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
            tag: 'b',
            getAttrs: (dom) => {
                return dom.style.fontWeight !== 'normal' && null;
            },
        },
        {
            style: 'font-weight',
            getAttrs: (value) => {
                return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
            }
        }
    ],
    toDOM() {
        return ['strong', 0];
    }
};
// :: MarkSpec Code font mark. Represented as a `<code>` element.
const code = {
    parseDOM: [
        { tag: 'code' }
    ],
    toDOM() {
        return ['code', 0];
    }
};
// :: MarkSpec An underline mark. Rendered as an `<u>` element.
// Has parse rules that also match `text-decoration: underline`.
const u = {
    parseDOM: [
        { tag: 'u' },
        { style: 'text-decoration=underline' }
    ],
    toDOM() {
        return ['u', 0];
    }
};
// :: MarkSpec An underline mark. Rendered as an `<s>` element.
// Has parse rules that also match `strike`, `del` tag and css property `text-decoration: line-through`.
const s = {
    parseDOM: [
        { tag: 's' },
        { tag: 'strike' },
        { style: 'text-decoration=line-through' }
    ],
    toDOM() {
        return ['s', 0];
    }
};
const textColor = {
    attrs: {
        color: {
            default: null
        },
    },
    parseDOM: [
        {
            style: 'color',
            getAttrs: (value) => {
                return { color: value };
            }
        }
    ],
    toDOM(mark) {
        const { color } = mark.attrs;
        return ['span', { style: `color:${color};` }, 0];
    },
};
const textBackgroundColor = {
    attrs: {
        backgroundColor: {
            default: null
        },
    },
    parseDOM: [
        {
            style: 'background-color',
            getAttrs: (value) => {
                return { backgroundColor: value };
            }
        }
    ],
    toDOM(mark) {
        const { backgroundColor } = mark.attrs;
        return ['span', { style: `background-color:${backgroundColor};` }, 0];
    },
};
const marks = {
    link,
    em,
    strong,
    code,
    u,
    s,
    text_color: textColor,
    text_background_color: textBackgroundColor
};
export default marks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtZWRpdG9yL3NjaGVtYS9tYXJrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxpRUFBaUU7QUFDakUsZ0VBQWdFO0FBQ2hFLFdBQVc7QUFDWCxNQUFNLElBQUksR0FBYTtJQUNyQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7UUFDeEIsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtLQUM5QjtJQUNELFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFFBQVEsRUFBRTtRQUNSO1lBQ0UsR0FBRyxFQUFFLFNBQVM7WUFDZCxRQUFRLENBQUMsR0FBZ0I7Z0JBQ3ZCLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUM5QixLQUFLLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztpQkFDbkMsQ0FBQztZQUNKLENBQUM7U0FDRjtLQUFDO0lBQ0osS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRixDQUFDO0FBRUYsK0RBQStEO0FBQy9ELGtFQUFrRTtBQUNsRSxNQUFNLEVBQUUsR0FBYTtJQUNuQixRQUFRLEVBQUU7UUFDUixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7UUFDWixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7UUFDYixFQUFFLEtBQUssRUFB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VTtRQUNkLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLGVBQWUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGLENBQUM7QUFFRixNQUFNLEtBQUssR0FBRztJQUNaLElBQUk7SUFDSixFQUFFO0lBQ0YsTUFBTTtJQUNOLElBQUk7SUFDSixDQUFDO0lBQ0QsQ0FBQztJQUNELFVBQVUsRUFBRSxTQUFTO0lBQ3JCLHFCQUFxQixFQUFFLG1CQUFtQjtDQUMzQyxDQUFDO0FBRUYsZUFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET01PdXRwdXRTcGVjLCBNYXJrLCBNYXJrU3BlYyB9IGZyb20gJ3Byb3NlbWlycm9yLW1vZGVsJztcblxuLy8gOjogTWFya1NwZWMgQSBsaW5rLiBIYXMgYGhyZWZgIGFuZCBgdGl0bGVgIGF0dHJpYnV0ZXMuIGB0aXRsZWBcbi8vIGRlZmF1bHRzIHRvIHRoZSBlbXB0eSBzdHJpbmcuIFJlbmRlcmVkIGFuZCBwYXJzZWQgYXMgYW4gYDxhPmBcbi8vIGVsZW1lbnQuXG5jb25zdCBsaW5rOiBNYXJrU3BlYyA9IHtcbiAgYXR0cnM6IHtcbiAgICBocmVmOiB7fSxcbiAgICB0aXRsZTogeyBkZWZhdWx0OiBudWxsIH0sXG4gICAgdGFyZ2V0OiB7IGRlZmF1bHQ6ICdfYmxhbmsnIH1cbiAgfSxcbiAgaW5jbHVzaXZlOiBmYWxzZSxcbiAgcGFyc2VET006IFtcbiAgICB7XG4gICAgICB0YWc6ICdhW2hyZWZdJyxcbiAgICAgIGdldEF0dHJzKGRvbTogSFRNTEVsZW1lbnQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiBkb20uZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgICAgdGl0bGU6IGRvbS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyksXG4gICAgICAgICAgdGFyZ2V0OiBkb20uZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XSxcbiAgdG9ET00obm9kZSk6IERPTU91dHB1dFNwZWMge1xuICAgIGNvbnN0IHsgaHJlZiwgdGl0bGUsIHRhcmdldCB9ID0gbm9kZS5hdHRycztcbiAgICByZXR1cm4gWydhJywgeyBocmVmLCB0aXRsZSwgdGFyZ2V0IH0sIDBdO1xuICB9XG59O1xuXG4vLyA6OiBNYXJrU3BlYyBBbiBlbXBoYXNpcyBtYXJrLiBSZW5kZXJlZCBhcyBhbiBgPGVtPmAgZWxlbWVudC5cbi8vIEhhcyBwYXJzZSBydWxlcyB0aGF0IGFsc28gbWF0Y2ggYDxpPmAgYW5kIGBmb250LXN0eWxlOiBpdGFsaWNgLlxuY29uc3QgZW06IE1hcmtTcGVjID0ge1xuICBwYXJzZURPTTogW1xuICAgIHsgdGFnOiAnaScgfSxcbiAgICB7IHRhZzogJ2VtJyB9LFxuICAgIHsgc3R5bGU6ICdmb250LXN0eWxlPWl0YWxpYycgfVxuICBdLFxuICB0b0RPTSgpOiBET01PdXRwdXRTcGVjIHtcbiAgICByZXR1cm4gWydlbScsIDBdO1xuICB9XG59O1xuXG4vLyA6OiBNYXJrU3BlYyBBIHN0cm9uZyBtYXJrLiBSZW5kZXJlZCBhcyBgPHN0cm9uZz5gLCBwYXJzZSBydWxlc1xuLy8gYWxzbyBtYXRjaCBgPGI+YCBhbmQgYGZvbnQtd2VpZ2h0OiBib2xkYC5cbmNvbnN0IHN0cm9uZzogTWFya1NwZWMgPSB7XG4gIHBhcnNlRE9NOiBbXG4gICAgeyB0YWc6ICdzdHJvbmcnIH0sXG4gICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYSBHb29nbGUgRG9jcyBtaXNiZWhhdmlvciB3aGVyZVxuICAgIC8vIHBhc3RlZCBjb250ZW50IHdpbGwgYmUgaW5leHBsaWNhYmx5IHdyYXBwZWQgaW4gYDxiPmBcbiAgICAvLyB0YWdzIHdpdGggYSBmb250LXdlaWdodCBub3JtYWwuXG4gICAge1xuICAgICAgdGFnOiAnYicsXG4gICAgICBnZXRBdHRyczogKGRvbTogSFRNTEVsZW1lbnQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbS5zdHlsZS5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBudWxsO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQnLFxuICAgICAgZ2V0QXR0cnM6ICh2YWx1ZTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgYW55PiA9PiB7XG4gICAgICAgIHJldHVybiAvXihib2xkKGVyKT98WzUtOV1cXGR7Mix9KSQvLnRlc3QodmFsdWUpICYmIG51bGw7XG4gICAgICB9XG4gICAgfVxuICBdLFxuICB0b0RPTSgpOiBET01PdXRwdXRTcGVjIHtcbiAgICByZXR1cm4gWydzdHJvbmcnLCAwXTtcbiAgfVxufTtcblxuLy8gOjogTWFya1NwZWMgQ29kZSBmb250IG1hcmsuIFJlcHJlc2VudGVkIGFzIGEgYDxjb2RlPmAgZWxlbWVudC5cbmNvbnN0IGNvZGU6IE1hcmtTcGVjID0ge1xuICBwYXJzZURPTTogW1xuICAgIHsgdGFnOiAnY29kZScgfVxuICBdLFxuICB0b0RPTSgpOiBET01PdXRwdXRTcGVjIHtcbiAgICByZXR1cm4gWydjb2RlJywgMF07XG4gIH1cbn07XG5cbi8vIDo6IE1hcmtTcGVjIEFuIHVuZGVybGluZSBtYXJrLiBSZW5kZXJlZCBhcyBhbiBgPHU+YCBlbGVtZW50LlxuLy8gSGFzIHBhcnNlIHJ1bGVzIHRoYXQgYWxzbyBtYXRjaCBgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmVgLlxuY29uc3QgdTogTWFya1NwZWMgPSB7XG4gIHBhcnNlRE9NOiBbXG4gICAgeyB0YWc6ICd1JyB9LFxuICAgIHsgc3R5bGU6ICd0ZXh0LWRlY29yYXRpb249dW5kZXJsaW5lJyB9XG4gIF0sXG4gIHRvRE9NKCk6IERPTU91dHB1dFNwZWMge1xuICAgIHJldHVybiBbJ3UnLCAwXTtcbiAgfVxufTtcblxuLy8gOjogTWFya1NwZWMgQW4gdW5kZXJsaW5lIG1hcmsuIFJlbmRlcmVkIGFzIGFuIGA8cz5gIGVsZW1lbnQuXG4vLyBIYXMgcGFyc2UgcnVsZXMgdGhhdCBhbHNvIG1hdGNoIGBzdHJpa2VgLCBgZGVsYCB0YWcgYW5kIGNzcyBwcm9wZXJ0eSBgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2hgLlxuY29uc3QgczogTWFya1NwZWMgPSB7XG4gIHBhcnNlRE9NOiBbXG4gICAgeyB0YWc6ICdzJyB9LFxuICAgIHsgdGFnOiAnc3RyaWtlJyB9LFxuICAgIHsgc3R5bGU6ICd0ZXh0LWRlY29yYXRpb249bGluZS10aHJvdWdoJyB9XG4gIF0sXG4gIHRvRE9NKCk6IERPTU91dHB1dFNwZWMge1xuICAgIHJldHVybiBbJ3MnLCAwXTtcbiAgfVxufTtcblxuY29uc3QgdGV4dENvbG9yOiBNYXJrU3BlYyA9IHtcbiAgYXR0cnM6IHtcbiAgICBjb2xvcjoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gIH0sXG4gIHBhcnNlRE9NOiBbXG4gICAge1xuICAgICAgc3R5bGU6ICdjb2xvcicsXG4gICAgICBnZXRBdHRyczogKHZhbHVlOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0+IHtcbiAgICAgICAgcmV0dXJuIHsgY29sb3I6IHZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICBdLFxuICB0b0RPTShtYXJrOiBNYXJrKTogRE9NT3V0cHV0U3BlYyB7XG4gICAgY29uc3QgeyBjb2xvciB9ID0gbWFyay5hdHRycztcbiAgICByZXR1cm4gWydzcGFuJywgeyBzdHlsZTogYGNvbG9yOiR7Y29sb3J9O2AgfSwgMF07XG4gIH0sXG59O1xuXG5jb25zdCB0ZXh0QmFja2dyb3VuZENvbG9yOiBNYXJrU3BlYyA9IHtcbiAgYXR0cnM6IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICB9LFxuICBwYXJzZURPTTogW1xuICAgIHtcbiAgICAgIHN0eWxlOiAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgICBnZXRBdHRyczogKHZhbHVlOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0+IHtcbiAgICAgICAgcmV0dXJuIHsgYmFja2dyb3VuZENvbG9yOiB2YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cbiAgXSxcbiAgdG9ET00obWFyazogTWFyayk6IERPTU91dHB1dFNwZWMge1xuICAgIGNvbnN0IHsgYmFja2dyb3VuZENvbG9yIH0gPSBtYXJrLmF0dHJzO1xuICAgIHJldHVybiBbJ3NwYW4nLCB7IHN0eWxlOiBgYmFja2dyb3VuZC1jb2xvcjoke2JhY2tncm91bmRDb2xvcn07YCB9LCAwXTtcbiAgfSxcbn07XG5cbmNvbnN0IG1hcmtzID0ge1xuICBsaW5rLFxuICBlbSxcbiAgc3Ryb25nLFxuICBjb2RlLFxuICB1LFxuICBzLFxuICB0ZXh0X2NvbG9yOiB0ZXh0Q29sb3IsXG4gIHRleHRfYmFja2dyb3VuZF9jb2xvcjogdGV4dEJhY2tncm91bmRDb2xvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFya3M7XG4iXX0=