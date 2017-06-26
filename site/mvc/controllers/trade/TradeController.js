/**
 * @class TradeController class represents controller from MVC architecture.
 */
export default class TradeController{
     /** This constructor initializes model, view.
     * @param {Object} model
     * @param {Object} view
        */
     constructor(model, view) {
         
        this.model = model;
        this.view = view;

    }
  /** addItem method add item to model.
        * @param {Object} item
      */
    addItem(item){
        if (item) {
            this.model.addItem(item);
        }
    }

}
