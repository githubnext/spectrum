import { matchSorter } from "match-sorter";
import { useCallback, useEffect, useState } from "react";
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

import { vscode } from "./utilities/vscode";
import "./App.css";
import { Swatch } from "./components/swatch";
import { getColorVariables } from "./utilities/helpers";

function App() {
  const [activeVar, setActiveVar] = useState("");
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

  const handleClick = useCallback(
    (varName) => {
      setActiveVar(varName);
      vscode.postMessage({
        command: "copyThemeVariable",
        payload: {
          name: varName,
          value: cssVariables[varName],
        },
      });
    },
    [setActiveVar]
  );

  return (
    <main className="relative">
      <section className="p-4 sticky top-0 bg-[color:var(--vscode-editor-background)] z-50">
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
        {filteredKeys.length === 0 && (
          <div>
            <p>
              No variables found for query: <span className="font-bold">{search}</span>
            </p>
          </div>
        )}
        {filteredKeys.length > 0 && (
          <ul className="grid gap-8 swatch-grid">
            {filteredKeys.map((key) => (
              <li key={key}>
                <Swatch
                  isActive={key === activeVar}
                  onClick={handleClick}
                  varName={key}
                  value={cssVariables[key]}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
