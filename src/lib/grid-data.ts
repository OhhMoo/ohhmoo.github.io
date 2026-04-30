export const BLACK_COUNT = 14;

export const charImgs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "15"] as const;

export const charMessages: Record<string, string> = {
  "1": "Georgia is here!",
  "2": "Every designer loves flower!",
  "3": "Product Designer & Design Engineer.",
  "4": "Tennis!",
  "5": "Hope I can have my own cat one day :)",
  "6": "I have wonderful design power!",
  "7": "Help! I can't swim...",
  "8": "Chinese food is always the best!",
  "9": "Geese kind of scare me :(",
  "10": "Work out everyday!",
  "11": "I'd love to work at startups!",
  "12": "Painting gives new ideas!",
  "13": '"I wonder" is the best song ever...',
  "15": "Let's connect!",
  b1: "Thank you for watching!",
  b2: "More interesting products are coming now",
};

export type GridLayout = { cols: number; rows: number };

export function getLayout(width: number): GridLayout {
  return width <= 600 ? { cols: 5, rows: 9 } : { cols: 9, rows: 5 };
}

export function imgPath(charKey: string): string {
  if (charKey === "b1" || charKey === "b2") {
    return `/images/buttom-characters/${charKey.slice(1)}.jpg`;
  }
  return `/images/characters/${charKey}.jpg`;
}

export type CellSpec = {
  index: number;
  isBlack: boolean;
  charKey?: string;
  message?: string;
};

export function buildCells(layout: GridLayout, blackCount = BLACK_COUNT): CellSpec[] {
  const total = layout.cols * layout.rows;
  const center = Math.floor(layout.rows / 2) * layout.cols + Math.floor(layout.cols / 2);

  const blackSet = new Set<number>([center]);
  while (blackSet.size < blackCount) {
    blackSet.add(Math.floor(Math.random() * total));
  }

  const remainingImgs = [...charImgs.filter((k) => k !== "1")].sort(() => Math.random() - 0.5);
  const imgMap = new Map<number, string>([[center, "1"]]);
  let imgIdx = 0;
  for (const idx of blackSet) {
    if (idx !== center) imgMap.set(idx, remainingImgs[imgIdx++] ?? "1");
  }

  const cells: CellSpec[] = [];
  for (let i = 0; i < total; i++) {
    const isBlack = blackSet.has(i);
    if (isBlack) {
      const charKey = imgMap.get(i) ?? "1";
      cells.push({ index: i, isBlack: true, charKey, message: charMessages[charKey] });
    } else {
      cells.push({ index: i, isBlack: false });
    }
  }
  return cells;
}

export function buildRowCells(layout: GridLayout): CellSpec[] {
  const cols = layout.cols;
  const center = Math.floor(cols / 2);

  const blackSet = new Set<number>([center]);
  while (blackSet.size < 3) {
    blackSet.add(Math.floor(Math.random() * cols));
  }

  const bottomChars = ["b1", "b2"];
  const imgMap = new Map<number, string>([[center, "3"]]);
  let idx2 = 0;
  for (const idx of blackSet) {
    if (idx !== center) imgMap.set(idx, bottomChars[idx2++] ?? "b1");
  }

  const cells: CellSpec[] = [];
  for (let i = 0; i < cols; i++) {
    const isBlack = blackSet.has(i);
    if (isBlack) {
      const charKey = imgMap.get(i) ?? "3";
      const message = i === center ? "Product Designer & Design Engineer." : charMessages[charKey];
      cells.push({ index: i, isBlack: true, charKey, message });
    } else {
      cells.push({ index: i, isBlack: false });
    }
  }
  return cells;
}
