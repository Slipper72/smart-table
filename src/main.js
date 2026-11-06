import './fonts/ys-display/fonts.css'
import './style.css'

import {data as sourceData} from "./data/dataset_1.js";

import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";

import {initTable} from "./components/table.js";
import {initPagination} from "./components/pagination.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initSearching} from "./components/searching.js" // @todo: подключение

// Исходные данные используемые в render()
const {data, ...indexes} = initData(sourceData);

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
    const state = processFormData(new FormData(sampleTable.container));
    const rowsPerPage = parseInt(state.rowsPerPage);    // приведём количество страниц к числу
    const page = parseInt(state.page ?? 1);             // номер страницы по умолчанию 1 и тоже число

    return {
        ...state,
        rowsPerPage,
        page
    };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
    const state = collectState();
    let result = [...data];
    const debug = [`всего: ${result.length}`];

    result = applySearching(result, state, action);
    debug.push(`после поиска: ${result.length}`);
    result = applyFiltering(result, state, action);
    debug.push(`после фильтра: ${result.length}`);
    result = applySorting(result, state, action);
    debug.push(`после сортировки: ${result.length}`);
    result = applyPagination(result, state, action);
    debug.push(`после пагинации: ${result.length}`);

    const panel = document.getElementById('debug-panel') || document.body.appendChild(Object.assign(document.createElement('pre'), {id: 'debug-panel'}));
    panel.textContent = debug.join(' | ');

    sampleTable.render(result);
}

// ошибки JS тоже выведем на страницу, раз консоли в CI нет
window.addEventListener('error', (e) => {
    const panel = document.getElementById('debug-panel') || document.body.appendChild(Object.assign(document.createElement('pre'), {id: 'debug-panel'}));
    panel.textContent += ` | ОШИБКА: ${e.message} (${e.filename}:${e.lineno})`;
});

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ['header', 'search', 'filter'],
    after: ['pagination']
}, render);

// @todo: инициализация
const applyPagination = initPagination(
    sampleTable.pagination.elements,
    (el, page, isCurrent) => {
        const input = el.querySelector('input');
        const label = el.querySelector('span');
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    }
);

const applySorting = initSorting([
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);


const applyFiltering = initFiltering(sampleTable.filter.elements, {    // передаём элементы фильтра
    searchBySeller: indexes.sellers                                    // для элемента с именем searchBySeller устанавливаем массив продавцов
});

const applySearching = initSearching('search');

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

render();