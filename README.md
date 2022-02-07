# Spectrum

This is a VSCode extension (webview) that helps you find and copy a VSCode theme CSS variable quickly and easily! No more messing around with the Chrome dev tools – fire up this webview and find what you're looking for, fast.

![Screen Shot 2022-02-02 at 4 13 15 PM](https://user-images.githubusercontent.com/5148596/152238301-cea849d3-442a-46f6-afd2-838e5a17c321.png)

## Usage
Once installed, open the webview by invoking the **Spectrum: Show theme tokens** command from the command palette.

![Screen Shot 2022-02-07 at 11 16 35 AM](https://user-images.githubusercontent.com/5148596/152827601-9354c604-d0d8-4c38-977d-9978041bf3e5.png)

Once the webview is open, filter the grid of swatches via the text field at the top of the screen. To copy a value, click a swatch and the VSCode quickpick UI will pop up. From there you can copy either the:
- Fully qualified CSS variable
- Raw CSS variable name
- Hex/RGB value

![Screen Shot 2022-02-02 at 4 21 47 PM](https://user-images.githubusercontent.com/5148596/152239366-5c1d3485-8b8e-4efc-95e9-bda1a55815bb.png)


## Local Development

### Dependencies

```bash
# Install dependencies for both the extension and webview UI source code
npm run install:all

# Build webview UI source code
npm run build:webview

# Open sample in VS Code
code .
```

### Running the extension
Once the extension is open inside VS Code you can run the extension by doing the following:

1. Press `F5` to open a new Extension Development Host window
2. Inside the host window, open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and type `Spectrum: Show theme tokens`
