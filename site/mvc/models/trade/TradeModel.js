import Event from '../../../events/Event';

/**
 * This class represents model from MVC architecture.
 * Models has composition of event which serve purpose of Subject.
 * Subject will have registry of observers to be notified.
 * it has map for spark data.
 * Spark data will get updated after each 30 seconds.
 * @class TradeModel
 */
export default class TradeModel {

    /** This constructor initializes items which is store for trades.
     * it initializes map for spark data.
     */
    constructor() {

        this.items = [];
        /**
         * this.itemAdded is composition for Events which will notify once items changes.
         */
        this.itemAdded = new Event(this);
        /**
         * id for sparksMap is name property of trade.
         */
        this.sparksMap = new Map();


    }
    /** a addItem method. 
      * This method add trade to items if it is new.
      * This method update items if trade is not new.
      * It notifies view[TradeView] once we prepare trade store. 
      * @param {Object} inputItem input trade to be added in TradeModelStore[items]
      */
    addItem(inputItem) {

        inputItem = JSON.parse(inputItem);
        if (!inputItem.name) { return; }
        this.addSpark(inputItem.name, inputItem.bestAsk, inputItem.bestBid);
        let itemsCopy = Object.assign([], this.items);
        let items_ = [];


        if (itemsCopy.length === 0) {
            items_.push(inputItem);
        } else {
            let isNew = true;
            items_ = itemsCopy.map((item, index) => {
                if (item.name === inputItem.name) {
                    isNew = false;

                    return {
                        name: inputItem.name,
                        bestBid: inputItem.bestBid,
                        bestAsk: inputItem.bestAsk,
                        openBid: inputItem.openBid,
                        openAsk: inputItem.openAsk,
                        lastChangeAsk: inputItem.lastChangeAsk,
                        lastChangeBid: inputItem.lastChangeBid,
                        midPrice: this.sparksMap.get(inputItem.name).sparkArr
                    };
                }
                else {
                    item.midPrice = this.sparksMap.get(item.name).sparkArr;
                    return item;
                }
            });
            if (isNew) {
                inputItem.midPrice = this.sparksMap.get(inputItem.name).sparkArr;
                items_.push(inputItem);
            }

        }
        this.items = [];
        this.items = items_;

        this.itemAdded.notify({
            items: items_
        });

    }
    /** addSpark method prepare spark data for individual trade and associate trade with timer of 30 second.
     * After 30 second it update spark data.
     * @param {Object} name
     * @param {Object} bestAsk
     * @param {Object} bestBid
     */
    addSpark(name, bestAsk, bestBid) {
        /**
         * Logic for preparing spark is 
         * (bestBid + bestAsk) / 2
         */
        let _spark = (bestBid + bestAsk) / 2;
        let sparkObj = this.sparksMap.get(name);
        /**
         * adding spark data with timer false for first time
         * and calculate spark data _spark
         */
        if (!sparkObj) {
            this.sparksMap.set(name, { sparkArr: [_spark], timer: false });
        } 
        else if (this.sparksMap.get(name).timer === false) {
            this.sparksMap.get(name).timer = true;
            /**
             * spark data is setup for updation after 30 sec using set interval.
             * After 30 seconds it delete old interval and create new one , and update new spark data.
             */
            let interval = setInterval(() => {
                this.sparksMap.get(name).timer = false;
                sparkObj=this.sparksMap.get(name);
                let sparkArr = sparkObj.sparkArr;
                sparkArr.push(_spark);
                this.sparksMap.set(name, { sparkArr: sparkArr, timer: sparkObj.timer });
                clearInterval(interval);

            }, 30000);
        }


    }

}

