
/**
 * This class represents Subject for Observer pattern.
 * Using this class we can implement two way or one way binding.
 * where changes are sent to Observer once observable changes.
 * Model and View can have this subject as composition and can
 * implement two way binding.
 * @class Event 
 * 
 */
export default class Event {
    /**
     * Constructor have subject as arguments.Here we use 
     * Model or View as subject. Event will have reference to Model or view.
     * Event have listener array , which will have list of callback functions.
     * for example , if view wanted to register to model for its changes, Model==>Event 
     * will have  view's callback function in its Listerner Array.
     */
    constructor(subject) {


        this.subject = subject;
        this.listener = [];

    }
    /**
     * this method is setter for adding callback in Listener Array.
     * It will add call back function.
     * This method will be called by Observer.
     */
    attach(listener) {

        this.listener.push(listener);
    }
    /**
     * this method will be called to sent notification to observer.
     * when this method id called, callback method from listener array 
     * will be called  with argument (agrs)
     * This method will be called by Obserable.
     */
    notify(args) {
       
        for (let index = 0; index < this.listener.length; index++) {
            this.listener[index](args);
        }
    }
}




