import { motion } from "framer-motion";
import copy from "copy-to-clipboard";

import { useState } from "react";

interface ToolbarProps {
  varName: string;
  value: string;
}

function CopyInput(props: Pick<ToolbarProps, "value">) {
  const [copied, setCopied] = useState(false);
  const { value } = props;

  const handleCopy = () => {
    copy(value, {
      debug: true,
      message: "Press #{key} to copy",
    });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[color:var(--vscode-input-background)] text-[color:var(--vscode-input-foreground)] border border-[color:var(--vscode-focusBorder)] p-2 relative overflow-ellipsis whitespace-pre flex items-center">
      <span className="text-xs font-mono truncate inline-block w-4/5">{value}</span>
      <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 copy-button-bg z-10">
        <button
          disabled={copied}
          onClick={handleCopy}
          className="px-2 py-1 text-xs bg-[color:var(--vscode-button-background)] text-[color:var(--vscode-button-foreground)] disabled:cursor-not-allowed">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function Toolbar(props: ToolbarProps) {
  const { varName, value } = props;
  return (
    <motion.div
      transition={{
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed left-4 right-4 bottom-4 grid grid-cols-3 gap-4 shadow-xl bg-[color:var(--vscode-checkbox-border)] p-4 rounded-md">
      <div className="">
        <CopyInput value={`var(${varName})`} />
      </div>
      <div className="">
        <CopyInput value={varName} />
      </div>
      <div className="">
        <CopyInput value={value} />
      </div>
    </motion.div>
  );
}
