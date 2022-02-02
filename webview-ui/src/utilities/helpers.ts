// Function that takes a string and returns true if it is a color, either in hex, rgb, or rgba
export function isColor(value: string) {
  return (
    /^#[0-9a-f]{3,6}$/i.test(value) || /^(rgb|rgba)\((\d{1,3},\s?){3,4}\d{1,3}\)$/i.test(value)
  );
}

export function getColorVariables() {
  const [html] = document.getElementsByTagName("html");
  if (!html) return {};

  const style = html.style;
  const cssVarNames = Object.values(style).filter((k) => {
    return k.startsWith("--vscode");
  });

  return cssVarNames.reduce<Record<string, string>>((acc, varName) => {
    const value = getComputedStyle(document.body).getPropertyValue(varName);
    if (isColor(value)) {
      // first and simplest use case is displaying color variables
      acc[varName] = value;
    }

    return acc;
  }, {});
}
