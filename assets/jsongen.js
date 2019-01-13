var fs = require('fs')
var wasteData = require("../static/swm_waste_wizard_APR.json")
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
var modifiedWasteData = {}
var keyIdPairs = {}
var count = 0
for (item of wasteData) {
    var singleItem = {
        "body": entities.decode(item["body"]),
        "category": item.category,
        "title": item.title,
        "keywords": item.keywords
    }
    for (keyword of item.keywords.replace(/[\(,\)]/g, '').split(" ")) {
        if(keyIdPairs.hasOwnProperty(keyword) === false) {
            keyIdPairs[keyword] = []
        }
        if (keyIdPairs[keyword].includes(count) === false){
            keyIdPairs[keyword].push(count)
        }
    }
    modifiedWasteData[count] = singleItem
    count += 1
}


fs.writeFileSync("./static/modifiedData.json", JSON.stringify(modifiedWasteData, undefined, 4))
fs.writeFileSync("./static/termIndex.json", JSON.stringify(keyIdPairs, undefined, 4))