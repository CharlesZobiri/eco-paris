export function isBefore1130(): boolean {
  const now = new Date();
  return (
    now.getHours() < 11 || (now.getHours() === 11 && now.getMinutes() < 30)
  );
}
