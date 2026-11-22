export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

            if (action && action.name === 'sort') {

            const btn = action.target.closest('button[data-field]') || action.target;
            
            if (btn) {
                const currentOrder = btn.dataset.value;

                const nextOrder = sortMap[currentOrder]; 

                btn.dataset.value = nextOrder;
                field = btn.dataset.field;
                order = nextOrder;

                columns.forEach(col => {
                    if (col !== btn) {
                        col.dataset.value = 'none';
                    }
                });
            }
        } else {
            columns.some(col => {
                if (col.dataset.value !== 'none') {
                    field = col.dataset.field;
                    order = col.dataset.value;
                    return true; // прерываем перебор
                }
                return false;
            });
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null; // сохраним в переменную параметр сортировки в виде field:direction

        return sort ? Object.assign({}, query, { sort }) : query;
    }
}