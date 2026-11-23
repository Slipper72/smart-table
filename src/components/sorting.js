const sortMap = {
    none: 'down',
    down: 'up',
    up: 'none'
};

export function initSorting(columns) {
    let field = null;
    let order = null;

    const applySorting = (query, state, action) => {
        if (action) {
            action.dataset.value = sortMap[action.dataset.value];

            field = action.dataset.field;
            order = action.dataset.value;

            columns.forEach(column => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = 'none';
                }
            });
        } else {
            columns.forEach(column => {
                if (column.dataset.value !== 'none') {
                    field = column.dataset.field;
                    order = column.dataset.value;
                }
            });
        }

        if (field && order !== 'none') {
            return Object.assign({}, query, {
                sort: `${field}:${order}`
            });
        }

        return query;
    };

    return applySorting;
}
