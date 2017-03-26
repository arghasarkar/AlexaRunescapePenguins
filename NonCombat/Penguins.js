"use strict";
let fetch = require("node-fetch");

const API_URL = "http://2016.world60pengs.com/rest/cache/actives.json";

exports.getPenguinLocations = function() {
    "use strict";

    return fetchPenguinLocations();
};

function fetchPenguinLocations() {
    "use strict";

    return fetch("http://2016.world60pengs.com/rest/cache/actives.json?_=1490474932011").then(function(response) {
        return response.json();
    });

}