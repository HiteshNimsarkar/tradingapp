import Event from '../../../events/Event';

/**
 * @class TradeModel class represents model from MVC architecture.
 */
export default class TradeModel {

    /** This constructor initializes items which is store for trades.
     */
    constructor() {

        this.items = [];
        /**
         * this.itemAdded is composition for Events which will notify once items changes.
         */
        this.itemAdded = new Event(this);
        this.sparksMap = new Map();


    }
    /** a addItem method. 
      * This method add trade to items if it is new.
      * This method update items if trade is not new.
      * It sorts items by lastChangeBid desc.
      * It notifies view[TradeView]. 
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
        let _spark = (bestBid + bestAsk) / 2;
        let sparkObj = this.sparksMap.get(name);
        if (!sparkObj) {
            this.sparksMap.set(name, { sparkArr: [_spark], timer: false });
        } 
        if (this.sparksMap.get(name).timer === false) {
            this.sparksMap.get(name).timer = true;
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

