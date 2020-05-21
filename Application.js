const logger = require('./util/logger')
const express = require('express');
const apis = require("./api");

class Application { 

    #server = express();

    #jsonout = () => {
        this.#server.use(express.json());
    }

    #router = () =>{
        this.router = express.Router();
    }

    #api = () => {
        this.#server.use("/api", apis);
    }

    init = () => {
        this.#jsonout()
        this.#router()
        this.#api()
        
    }

    server = () => {
        return this.#server;
    }
    
}

module.exports = Application

