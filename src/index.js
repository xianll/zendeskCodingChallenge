const prompt = require("prompt");
const { getSelectedKey, getObjId, getSelectedObj, getKeys } = require ("./input");
const { sortSearch } = require ("./data");

const searchPrompt = "\nWelcome to Zendesk Search!\n\nUse your arrows keys to navigate through the search options below.\nPress enter to make a selection.\n";

console.log(searchPrompt);

const search = async () => {
    try {
        const dataId = await getObjId();

        console.log(`Search through: ${dataId.value}.
                    \nBelow is a list of available search terms in ${dataId.value}.\nUse your arrows keys to navigate through the search options.\nPress enter to make a selection.\n`);

        const data = getSelectedObj(dataId.id);
        const keys = getKeys(data);
        const selectedKey = await getSelectedKey(keys);
        const selectedKeyValue = selectedKey.value;

        console.log(`Search through: ${dataId.value} > ${selectedKeyValue}
                    \nType in your search term below : `);

        const searchTerm = await prompt.get(["searchTerm"]);
        const searchTermValue = Object.values(searchTerm);

        console.log(`\nSearch through: ${dataId.value} > ${selectedKeyValue} > ${searchTermValue}\n`);

        const results = await sortSearch(dataId, data, selectedKeyValue, searchTermValue);

        results.forEach((element) => {
            console.log(element);
        });

        let resultString = "";
        if (results.length > 1) {
            resultString = "results were";
        } else {
            resultString = "result was";
        }

        console.log(`\n${results.length} ${resultString} returned from this search query.\n`);

    } catch (err) {
        console.log(err);
    }
};

search();