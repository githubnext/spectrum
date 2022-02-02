import { commands, ExtensionContext, workspace } from "vscode";
import { TokensPanel } from "./panels/TokensPanel";

export function activate(context: ExtensionContext) {
  const showTokensCommand = commands.registerCommand("theme-token-list.showTokens", () => {
    TokensPanel.render(context.extensionUri);
  });

  context.subscriptions.push(showTokensCommand);

  const themeChangeHandler = workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("workbench.colorTheme")) {
      TokensPanel.triggerUpdate();
    }
  });

  context.subscriptions.push(themeChangeHandler);
}
