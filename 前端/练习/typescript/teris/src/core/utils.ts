export function getRandom(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createDom(style?: any) {
  const dom = document.createElement("div");
  if(style)
  setStyle(dom, style);
  return dom;
}

export function setStyle(dom: any, style: any) {
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const value = style[key];
      dom.style[key as unknown as any] = value;
    }
  }
  return dom;
}
