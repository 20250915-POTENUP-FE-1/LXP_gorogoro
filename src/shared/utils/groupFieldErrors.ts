export function groupFieldErrors(items: FieldError[]) {
  const map: Record<string, string[]> = {};

  for (const it of items) {
    if (!map[it.field]) map[it.field] = [];
    // 같은 문구 중복 제거
    if (!map[it.field].includes(it.reason)) map[it.field].push(it.reason);
  }

  return map;
}
