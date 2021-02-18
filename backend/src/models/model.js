import { URL } from 'url';
import fetch  from 'node-fetch';

//base model
//defines how to fetch from the REST Server
//adds the authorization header to every request
export class Model {
    static get url() { return 'http://localhost:1234'; }
    static get apiPathTable(){ return "/tables"; }
    static get apiPathCourse(){ return "/courses"; }
    static get apiPathOrder(){ return "/orders"; }
    static get apiPathModifier() { return "/modifiers"; }

    static async fetch(path, options = {}){        
        const params = options.params ? options.params : "";
        const method = options.method ? options.method : "GET";

        const authToken = options.clientId;
        const fullPath = this.url + path;
        const url = new URL(fullPath);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        const response = await fetch(url.toString(), {
            method: method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                "Authorization": authToken
            }
        });

        switch(response.status){
            case 200: { break; }
        }

        return await response.json();
    }
}