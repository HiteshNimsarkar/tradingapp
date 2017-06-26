export default class Event {

    constructor(subject) {


        this.subject = subject;
        this.listener = [];

    }

    attach(listener) {

        this.listener.push(listener);
    }

    notify(args) {
       // console.log('calling notify');


        for (let index = 0; index < this.listener.length; index++) {
            this.listener[index](args);
        }
    }
}




