const organizationsData = require("../data/organizations.json");
const ticketsData = require("../data/tickets.json");
const usersData = require("../data/users.json");

const getRelatedDataByOrgId = (selectedKeyValue, searchTermValue) => {
    let results = [];
    if (!searchTermValue.length) {
        organizationsData.forEach((orgItem) => {
            let currentItem = orgItem[`${selectedKeyValue}`];
            let dataType = typeof currentItem;
            if (dataType === "undefined") {
                results.push(orgItem);
            }
        });
        return results;
    } else {
        let input = parseInt(searchTermValue);
        organizationsData.forEach((orgItem) => {
            let orgId = orgItem._id;
            if (orgId === input) {
                results.push(orgItem);
            }
        });
        ticketsData.forEach((ticketItem) => {
            let ticketOrgId = ticketItem.organization_id;
            if (ticketOrgId === input) {
                results.push(ticketItem);
            }
        });
        usersData.forEach((userItem) => {
            let userOrgId = userItem.organization_id;
            if (userOrgId === input) {
                results.push(userItem);
            }
        });
        return results;
    }
};

const getRelatedDataByUserId = (selectedKeyValue, searchTermValue) => {
    let results = [];
    if (!searchTermValue.length) {
        ticketsData.forEach((ticketItem) => {
            let currentItem = ticketItem[`${selectedKeyValue}`];
            let dataType = typeof currentItem;
            if (dataType === "undefined") {
                results.push(ticketItem);
            }
        });
        return results;
    } else {
        let input = parseInt(searchTermValue);
        if (selectedKeyValue === "_id") {
            ticketsData.forEach((ticketItem) => {
                if (ticketItem.assignee_id === input) {
                    results.push(ticketItem);
                } else if (ticketItem. submitter_id === input) {
                    results.push(ticketItem);
                }
            });
        }
        ticketsData.forEach((ticketItem) => {
            if (selectedKeyValue === "submitter_id") {
                let ticketUserId = ticketItem.submitter_id;
                if (ticketUserId === input) {
                    results.push(ticketItem);
                }
            } else if (selectedKeyValue === "assignee_id") {
                let ticketUserId = ticketItem.assignee_id;
                if (ticketUserId === input) {
                    results.push(ticketItem);
                }
            }
        });
        usersData.forEach((userItem) => {
            let userId = userItem._id;
            if (userId === input) {
                results.push(userItem);
            }
        });
        return results;
    }
};

const getSearchResults = (data, selectedKeyValue, searchTermValue) => {
    let results = [];
    let stvLowerCase = searchTermValue.toLowerCase();
    data.forEach((item) => {
        let currentItem = item[`${selectedKeyValue}`];
        let dataType = typeof currentItem;
        if (dataType === "object" && !!currentItem.length) {
            currentItem.forEach((e) => {
                let eLowerCase = e.toLowerCase();
                if (eLowerCase === stvLowerCase) {
                    results.push(item);
                }
            });
        } else if ( dataType === "boolean" || 
                    dataType === "number" ||
                    (dataType === "string" && !!currentItem.length) ) {
            let itemString = currentItem.toString();
            let itemLowerCase = itemString.toLowerCase();
            if (itemLowerCase === stvLowerCase) {
                results.push(item);
            }
        } else if (dataType === "undefined" && !searchTermValue.length) {
            results.push(item); 
        }
    });
    return results;
};

const sortSearch = (dataId, data, selectedKeyValue, searchTermValue) => {
    return new Promise((resolve, reject) => {
        let results = [];
        if ((dataId.id == 0 && selectedKeyValue === "_id") || 
            (dataId.id !== 0 && selectedKeyValue === "organization_id")) {
            results = getRelatedDataByOrgId(selectedKeyValue, searchTermValue[0]);
        } else if ((dataId.id == 1 || dataId.id == 2) && 
            (selectedKeyValue === "submitter_id" || 
            selectedKeyValue === "assignee_id" || 
            selectedKeyValue === "_id" )) {
            results = getRelatedDataByUserId(selectedKeyValue, searchTermValue[0]);
        } else {
            results = getSearchResults(data, selectedKeyValue, searchTermValue[0]);
        }

        if (results.length) {
            resolve(results);
        } else {
            reject("There were no results given the search inputs. Please try again. \n");
        }
    });
};

module.exports = {
    getRelatedDataByOrgId,
    getSearchResults,
    getRelatedDataByUserId,
    sortSearch
};      