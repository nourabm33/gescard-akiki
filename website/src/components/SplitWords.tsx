import { Fragment } from "react";

type Segment = string | { text: string; em?: boolean };

type Props = {
  segments: Segment[];
  /** Delay before the first word, in ms. */
  delay?: number;
  emClassName?: string;
};

/** Renders a heading word-by-word so each word can rise from its own line mask (see `.split-word`). */
export default function SplitWords({ segments, delay = 0, emClassName = "font-normal text-gold" }: Props) {
  let index = 0;
  return (
    <>
      {segments.map((seg, s) => {
        const { text, em } = typeof seg === "string" ? { text: seg, em: false } : seg;
        const words = text.trim().split(/\s+/).map((word, w, arr) => {
          const i = index++;
          return (
            <Fragment key={w}>
              <span className="split-word">
                <span style={{ "--i": i, "--d": `${delay}ms` } as React.CSSProperties}>{word}</span>
              </span>
              {w < arr.length - 1 ? " " : null}
            </Fragment>
          );
        });
        return (
          <Fragment key={s}>
            {s > 0 ? " " : null}
            {em ? <em className={emClassName}>{words}</em> : words}
          </Fragment>
        );
      })}
    </>
  );
}
