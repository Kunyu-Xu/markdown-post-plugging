export const copyHtmlWithStyle = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const clone = element.cloneNode(true) as HTMLElement;

  const inlineStyles = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const properties = Array.from(computedStyle);
    for (const key of properties) {
      element.style[key as any] = computedStyle.getPropertyValue(key);
    }
  };

  const applyStylesRecursively = (element: HTMLElement) => {
    inlineStyles(element);
    Array.from(element.children).forEach((child) =>
      applyStylesRecursively(child as HTMLElement),
    );
  };

  applyStylesRecursively(clone);
  const htmlContent = clone.outerHTML;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
      }),
    ]);
  } catch (error) {
    console.error("Failed to copy content with style:", error);
  }
}; 