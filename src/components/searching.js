import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
    const comparator = createComparison([], [
    rules.searchMultipleFields(searchField, ["date", "customer", "seller"], false),
  ]);

  return (data, state, action) => {
    // @todo: #5.2 — применить компаратор
    const query = state[searchField];
    if (!query) {
      return data;
    }
    // Используем метод filter: оставляем только те строки, где comparator вернул true
    return data.filter((item) => comparator(item, { [searchField]: query }));

}}