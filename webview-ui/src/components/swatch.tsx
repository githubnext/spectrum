interface SwatchProps {
  varName: string;
  value: string;
  onClick: (varName: string) => void;
}

export function Swatch(props: SwatchProps) {
  const { varName, value, onClick } = props;
  return (
    <div>
      <button
        onClick={() => onClick(varName)}
        className="appearance-none focus:ring rounded-md overflow-hidden w-full ">
        <div aria-label={varName} style={{ background: value }} className="aspect-square"></div>
      </button>
      <div className="flex flex-col space-y-1 mt-2 text-xs">
        <span className="font-mono">{varName}</span>
      </div>
    </div>
  );
}
