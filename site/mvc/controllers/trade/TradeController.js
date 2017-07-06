/**
 * This class represents controller from MVC architecture.
 * Model and view will be used to bind in controller. With this we can achieve 
 * two way binding where if model get updated , view gets rendered or view gets changed
 * model will updated.
 * For two way binding, obserrver pattern is used.
 * Model and view can have event as composition.
 * Anthing which want to listen to changes register to events.
 * @class TradeController
 */
export default class TradeController{
    /** This constructor initializes model, view.
     * For two way binding, Model and view is used.
     * Action is fired on corresponding entity.
     * Model is setup with view as listening to Model.
     * 
     * @param {Object} model
     * @param {Object} view
        */
     constructor(model, view) {
         
        this.model = model;
        this.view = view;

    }
  /** addItem method add item to model.
   * Any actions/events like click event,websocket data push etc. will call this 
   * method. From this method model will be get delegated over its addItem method.
   * This is place for putting logic where different models can be processed.
   * This Method has one input parameter which will be get added to store of model.
   * For example model is mainating list/store of trades, by calling this method new item will 
   * added or updated in model store.
   * @param {Object} item
   */
    addItem(item){
        if (item) {
            this.model.addItem(item);
        }
    }

}
