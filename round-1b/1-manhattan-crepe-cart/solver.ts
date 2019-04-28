import fs from "fs";

const input = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/);

function read_string() {
  if (!input.length) throw new Error("unexpected EOF");
  return input.shift();
}

function read_number() {
  return +read_string();
}

function parse_cases() {
  const count = read_number();
  for (let i = 0; i < count; ++i) parse_case();
  if (input.length) throw new Error("unexpected additional input");
}

let caze = 0;
let P, Q: number;
let rects: {
  points: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}[] = [];

function parse_case() {
  P = read_number();
  Q = read_number();
  rects = [
    {
      points: 0,
      x1: 0,
      y1: 0,
      x2: Q,
      y2: Q
    }
  ];
  process.stdout.write("Case #" + ++caze + ": ");
  for (let i = 0; i < P; ++i) parse_person();
  const bestRect = rects.reduce((a, b) =>
    a.points !== b.points
      ? a.points > b.points
        ? a
        : b
      : a.x1 !== b.x1
      ? a.x1 < b.x1
        ? a
        : b
      : a.y1 < b.y1
      ? a
      : b
  );
  process.stdout.write(bestRect.x1 + " " + bestRect.y1 + "\n");
}

function parse_person() {
  const x = read_number();
  const y = read_number();
  const dir = read_string() as "N" | "S" | "E" | "W";

  const splitRects = rects.map(rect => {
    switch (dir) {
      case "N":
        if (y < rect.y1) return { ...rect, points: rect.points + 1 };
        else if (y < rect.y2)
          return [
            { ...rect, y2: y },
            { ...rect, y1: y + 1, points: rect.points + 1 }
          ];
        else return rect;
      case "S":
        if (y > rect.y2) return { ...rect, points: rect.points + 1 };
        else if (y > rect.y1)
          return [
            { ...rect, y2: y - 1, points: rect.points + 1 },
            { ...rect, y1: y }
          ];
        else return rect;
      case "E":
        if (x < rect.x1) return { ...rect, points: rect.points + 1 };
        else if (x < rect.x2)
          return [
            { ...rect, x2: x },
            { ...rect, x1: x + 1, points: rect.points + 1 }
          ];
        else return rect;
      case "W":
        if (x > rect.x2) return { ...rect, points: rect.points + 1 };
        else if (x > rect.x1)
          return [
            { ...rect, x2: x - 1, points: rect.points + 1 },
            { ...rect, x1: x }
          ];
        else return rect;
    }
  });

  rects = [].concat(...splitRects);
}

parse_cases();
