const SplitText = ({ text, type = "words", className = "" }) => {
  const parts = type === "chars" ? Array.from(text) : text.split(" ");

  return (
    <span className={`split ${className}`} aria-label={text}>
      {parts.map((part, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span className="split-mask" aria-hidden="true">
            <span className="split-inner" data-split>
              {part === " " ? "\u00A0" : part}
            </span>
          </span>
          {type === "words" && i < parts.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
};

export default SplitText;