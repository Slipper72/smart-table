export function initSorting(columns) {
    let currentColumn = null;
    let currentOrder = null;

    const applySorting = (query, state, action) => {

        if (action) {
            const btn = action.closest?.('button[data-field]');

            if (btn) {
                currentColumn = btn;
                currentOrder = btn.dataset.value === 'asc' ? 'desc' : 'asc';

                columns.forEach(column => {
                    column.dataset.value = column === currentColumn ? currentOrder : 'none';
                });
            }
        }

        if (currentColumn && currentOrder && currentOrder !== 'none') {
            return Object.assign({}, query, {
                sort: `${currentColumn.dataset.field}:${currentOrder}`
            });
        }

        return query;
    };

    return applySorting;
}
