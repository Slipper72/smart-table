export function initSearching(searchField) {
    return (query, state, action) => {
        if (state[searchField]) {
            return Object.assign({}, query, { search: state[searchField] });
        }
        return query;
    };
} 