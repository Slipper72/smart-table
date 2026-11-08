const render = (data) => {
    const nextRows = data.map((item) => {
        const row = cloneTemplate(rowTemplate);
        Object.keys(item).forEach((key) => {
            if (key in row.elements) {
                row.elements[key].textContent = item[key];
            }
        });
        return row.container;              // возвращаем DOM-элемент строки
    });
    root.elements.rows.replaceChildren(...nextRows);
}
