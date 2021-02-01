export function equalCards(pair1: string[], pair2: string[]): boolean {
  // TRIM_START
  return (
    (pair1[0] === pair2[0] && pair1[1] === pair2[1]) ||
    (pair1[0] === pair2[1] && pair1[1] === pair2[0])
  );
  // TRIM_END
}
