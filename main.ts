// earned-pride-01 — one quiet, earned moment of pride in a single line.
// Hand-written, zero dependencies, no network, fully deterministic.
// Writes the line to <output dir>/entry.txt with no trailing newline,
// so the file is exactly the line text and nothing else.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Round 1 draft: "After six months of carrying her father's toolbox up
// the ladder, Maya, ten, tightened the last bolt on the treehouse roof
// and sat back on the beam, legs dangling, grinning at nothing in
// particular." Critique: the scene is concrete, but "six months of
// carrying" summarises the effort instead of letting the reader feel it,
// and "grinning" asserts the pride rather than showing it; the pride
// also lands mid-line instead of at the last word.
// Round 2 draft: "Maya, ten, hauled her father's toolbox up the ladder
// one last time, tightened the final bolt on the treehouse roof, and
// stayed up there a while, legs swinging over the yard she could
// finally see from above." Critique: effort is felt ("hauled", "one
// last time", "final bolt") and pride is shown by staying, but "one
// last time" plus "final bolt" repeats the same beat, and "a while" is
// flatter than the pride deserves — the proudest version is a kid who
// cannot bear to come down at all.
// Final: "for the last time" carries the long effort, "the last bolt"
// is the landing, and "long after dark" is the pride shown, not told —
// she stays up there with the view she earned as the last word.
const LINE =
  "Maya, ten, carried her father's toolbox up the ladder for the last time, tightened the last bolt on the treehouse roof, and stayed up there long after dark, legs swinging over a yard she could finally see from above.";

// The gate requires the line to be 1–240 characters and not only
// whitespace; refuse to write anything that would fail it.
if (LINE.length < 1 || LINE.length > 240 || LINE.trim().length === 0) {
  console.error(
    `error: entry line is invalid (length ${LINE.length}, must be 1-240 characters and not only whitespace)`,
  );
  process.exit(1);
}

// The grader mounts the output directory at /output and tells us via
// MAKEFUN_OUTPUT_DIR; default to /output when the variable is unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
chmodSync(file, 0o644);
