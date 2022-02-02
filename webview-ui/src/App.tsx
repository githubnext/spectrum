import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import "./App.css";

// Function that takes a string and returns true if it is a color, either in hex, rgb, or rgba
function isColor(value: string) {
  return (
    /^#[0-9a-f]{3,6}$/i.test(value) || /^(rgb|rgba)\((\d{1,3},\s?){3,4}\d{1,3}\)$/i.test(value)
  );
}

function getColorVariables() {
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

function App() {
  const [search, setSearch] = useState("");
  const [cssVariables, setCssVariables] = useState<Record<string, string>>(() =>
    getColorVariables()
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data.command === "updateTheme") {
        setCssVariables(getColorVariables());
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const filteredKeys = matchSorter(Object.keys(cssVariables), search, {});

  return (
    <main className="relative">
      <section className="p-4 sticky top-0 bg-[color:var(--vscode-editor-background)]">
        <VSCodeTextField
          onInput={(e) => {
            // @ts-ignore
            setSearch(e.target?.value);
          }}
          value={search}
          className="w-full"
          placeholder="Filter by variable name"
        />
      </section>
      <section aria-label="Variables grid" className="px-4 pt-4 pb-4">
        <ul className="grid gap-8 swatch-grid">
          {filteredKeys.map((key) => (
            <li key={key}>
              <button className="appearance-none focus:ring rounded-md overflow-hidden w-full border border-[color:var(--vscode-input-border)]">
                <div
                  aria-label={key}
                  style={{ background: cssVariables[key] }}
                  className="aspect-square"></div>
              </button>
              <div className="flex flex-col space-y-1 mt-2 text-xs">
                <span className="font-mono">{key}</span>
                <span className="font-mono">{cssVariables[key]}</span>
              </div>
            </li>
          ))}
          {filteredKeys.length === 0 && (
            <div>
              <p>
                No variables found for query: <span className="font-bold">{search}</span>
              </p>
            </div>
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
