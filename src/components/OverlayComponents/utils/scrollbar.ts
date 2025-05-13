export const isScrollbarVisible = () => {
    return document.body.scrollHeight > document.body.clientHeight;
}

export const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const width = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode?.removeChild(outer);

    return width;
}

export const addScrollbarPadding = (width: number) => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = width + 'px';
}

export const removeScrollbarPadding = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}
