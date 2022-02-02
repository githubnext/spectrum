interface SwatchProps {
  varName: string;
  isActive?: boolean;
  value: string;
  onClick: (varName: string) => void;
}

export function Swatch(props: SwatchProps) {
  const { varName, value, onClick, isActive } = props;
  return (
    <div>
      <div className="relative">
        <button
          onClick={() => onClick(varName)}
          className="appearance-none focus:ring rounded-md overflow-hidden w-full z-10">
          <div aria-label={varName} style={{ background: value }} className="aspect-square"></div>
        </button>
        <div
          style={{ background: value }}
          aria-hidden="true"
          className={`aspect-square rounded-md absolute inset-0 z-0 transform transition pointer-events-none ${
            isActive ? "opacity-75 rotate-2" : "opacity-0"
          }`}></div>
        <div
          style={{ background: value }}
          aria-hidden="true"
          className={`aspect-square rounded-md absolute inset-0 z-0 transform transition pointer-events-none ${
            isActive ? "opacity-50 rotate-4" : "opacity-0"
          }`}></div>
        <div
          style={{ background: value }}
          aria-hidden="true"
          className={`aspect-square rounded-md absolute inset-0 z-0 transform transition pointer-events-none ${
            isActive ? "opacity-25 rotate-6" : "opacity-0"
          }`}></div>
      </div>

      <div className="flex flex-col space-y-1 mt-2 text-xs">
        <span className="font-mono">{varName}</span>
      </div>
    </div>
  );
}
