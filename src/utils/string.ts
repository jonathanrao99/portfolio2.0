export function wrapLettersInSpan(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = text
    .split("")
    .map((char) =>
      char === " " ? "<span> </span>" : `<span class="letter">${char}</span>`
    )
    .join("");
}

export function wrapWordsInSpan(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = text
    .split(" ")
    .map((word) => `<span>${word}</span>`)
    .join(" ");
}

export function getChildIndex(child: Element) {
  return Array.from(child.parentNode?.children || []).indexOf(child);
}
