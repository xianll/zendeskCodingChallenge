const cliSelect = require("cli-select");
const organizationsData = require("../data/organizations.json");
const ticketsData = require("../data/tickets.json");
const usersData = require("../data/users.json");

const getObjId = () => {
    return cliSelect({
        values: [
            "Organizations",
            "Tickets",
            "Users"
        ],
        defaultValue: 0,
        selected: "(X)",
        unselected: "( )",
        indentation: 2,
    });
};

const getSelectedObj = (id) => {
    let selectedObj = [];
    switch (id) {
        case 0 : 
            selectedObj = organizationsData;
            break;
        case 1: 
            selectedObj = ticketsData;
            break;
        case 2: 
            selectedObj = usersData;
            break;
    }
    return selectedObj;
};

const getKeys = (obj) => {
    let objKeys = [];
    let allObjKeys = [];
    obj.forEach((element) => {
        objKeys = Object.keys(element);
        objKeys.forEach((key) => {
            if (!allObjKeys.includes(key)) {
                allObjKeys.push(key);               
            }
        });
    });
    return allObjKeys;
};

const getSelectedKey = (keys) => {
    return cliSelect({
        values: keys,
        defaultValue: 0,
        selected: "(X)",
        unselected: "( )",
        indentation: 2,
    });
};

module.exports = {
    getObjId,
    getSelectedObj,
    getSelectedKey,
    getKeys
};