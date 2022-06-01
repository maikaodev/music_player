export function secondesToMinutes(time: number) {
  const minutes = Math.floor(time / 60);
  const secondes = Math.floor(time % 60);
  return `${('0' + minutes).slice(-2)}:${('0' + secondes).slice(-2)}`;
}
