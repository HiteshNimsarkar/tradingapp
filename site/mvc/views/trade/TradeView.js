/**
 * This class represents view from MVC architecture.
 * IT create table dynamically and renders it.
 * Dynamic Table will create rows once view get data from models.
 * View Listen to Model. Once model notifies view , it will render Table.
 * View register to Model in constructor.
 * @class TradeView
 * 
 */
export default class TradeView {
    /** This constructor initializes model, gridtemplate.
     * View registers to model which is passed in constructor.
     * Whenever model updates it will notify view.
     * Once view get data from model, it will rerender grid.
     * Grid Template is used for initization.
     * for example:
     * let grid={
                    id:'tradeGrid',
                    columns:[
                    {
                        header:'Name',
                        value:'name',
                        type: 'string'
                    },
                    {
                        header:'Mid price',
                        component:(id,row)=>{
                    
                        Sparkline.draw(id, row.midPrice)},
                        type: 'Array'
                    },
                    ]};

     * GridTemplate  has Metadata   
     * it has id, columns.
     * id is html div id.
     * columns has array of column metadata.
     * it has header name ,its value and its type.
     * you can pass column as separate funcion which can render another component, 
     * or can do additional decorator rendering.
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

    /**
     * this is delegate method which will be executed by model.
     * this method is passed to model while registering.
     * Once this method is called by Model upon trade changes,
     * it will build table.
     * Input to this function is array of items.
     * which contain list of trade to render.
     * @param {Array} items
     */
    rebuildList(items) {

        this.buildTable(items)
    }
    /** buildTable method build HTML table with provided items Array.
     * this table read grid id from grid template.
     * first it cleans all element and listers for old grid which was rendered.
     * After that it create table element dynamically, 
     * then it adds header and rows.
     * it sorts the table after its creation.
     * @param {Array} items
     */
    buildTable(items) {
        let id = this.gridTemplate.id;
        let tablearea = document.getElementById(id);
        let sortColumn=4;
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
        this.sortTable(table,sortColumn)
        tablearea.appendChild(table);

    }
    /** buildHeader method build HTML table header with provided row and table.
     * it builds the header based on grid template , which has metadata about grid.
     * it creates the column header from grid metadata and it to table .
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
     * it create row element with getting value from items of trade.
     * it used grid template to get column name and then fetch its value.
     * it that value is of type function , it will call that callback function and send 
     * input data as arguments.
     * @param {Array} items
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
     * it sort table based on column provided in ascending way.
     * it checks the value of columne mentioned and then it set should replace.
     * it then replace those rows.
     * @param {Object} column
     * @param {Object} table
     */
    sortTable(table,column) {
        let rows, replace, i, x, y, shouldReplace;

        replace = true;
        while (replace) {
            replace = false;
            rows = table.getElementsByTagName("TR");
            for (i = 1; i < (rows.length - 1); i++) {
                shouldReplace = false;
                x = rows[i].getElementsByTagName("TD")[column];
                y = rows[i + 1].getElementsByTagName("TD")[column];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
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