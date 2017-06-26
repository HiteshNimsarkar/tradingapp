/**
 * @class TradeView class represents view from MVC architecture.
 */
export default class TradeView {
    /** This constructor initializes model, gridtemplate.
     * @param {Object} model
     * @param {Object} gridTemplate
     */
    constructor(model, gridTemplate) {

        this.model = model;
        this.gridTemplate = gridTemplate;
        this.model.itemAdded.attach((items) => {
            this.rebuildList(items);

        });
        this.buildTable();
    }

    rebuildList(items) {

        this.buildTable(items)
    }
    /** buildTable method build HTML table with provided items Array.
     * @param {Array} items
     */
    buildTable(items) {
        let id = this.gridTemplate.id;
        let tablearea = document.getElementById(id);
        if (document.getElementById('table_id')) {
            let table_ = document.getElementById('table_id')
            tablearea.removeChild(table_);
        }
        tablearea.innerHTML = "";
        let table = document.createElement('table');
        table.id = 'table_id';

        //Add the header row.
        let row = table.insertRow(-1);
        this.buildHeader(row, table);
        if (items) {
            this.buildDataRows(items, table);
        }
        this.sortTable(table)
        tablearea.appendChild(table);

    }
    /** buildHeader method build HTML table header with provided row and table.
     * @param {Object} row
     * @param {Object} table
     */
    buildHeader(row, table) {
        for (let i = 0; i < this.gridTemplate.columns.length; i++) {
            let headerCell = document.createElement("TH");
            headerCell.innerHTML = this.gridTemplate.columns[i].header;
            row.appendChild(headerCell);
        }
    }
    /** buildDataRows method build HTML table rows with provided row and table.
     * @param {Object} row
     * @param {Object} table
     */
    buildDataRows(items, table) {
        //Add the data rows.

        for (let i = 0; i < items.items.length; i++) {
            let row = table.insertRow(-1);
            for (let j = 0; j < this.gridTemplate.columns.length; j++) {
                let runComponent = false;
                let cell = row.insertCell(-1);
                let cellValue = items.items[i][this.gridTemplate.columns[j].value];
                if (!cellValue && typeof this.gridTemplate.columns[j].component === "function") {

                    cellValue = document.createElement('div');
                    cellValue.id = 'spark' + i;
                    runComponent = true;
                    cell.appendChild(cellValue);
                    this.gridTemplate.columns[j].component(cellValue, items.items[i]);
                    continue;
                }
                cell.innerHTML = cellValue;


            }
        }
    }
    /** sortTable method sort HTML table  with provided table.
      * @param {Object} table
      */
    sortTable(table) {
        let rows, replace, i, x, y, shouldReplace;

        replace = true;
        while (replace) {
            replace = false;
            rows = table.getElementsByTagName("TR");
            for (i = 1; i < (rows.length - 1); i++) {
                shouldReplace = false;
                x = rows[i].getElementsByTagName("TD")[4];
                y = rows[i + 1].getElementsByTagName("TD")[4];
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldReplace = true;
                    break;
                }
            }
            if (shouldReplace) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                replace = true;
            }
        }
    }



}