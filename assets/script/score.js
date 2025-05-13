'use strict';

export default class Score {
    #date;
    #hits;

    constructor (hits) {
        this.#date = Date.now();
        this.#hits = hits;
    }

    get date() {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }
    
        return new Date(this.#date).toLocaleDateString('en-ca', options);
    }

    get hits() {
        return this.#hits;
    }
}