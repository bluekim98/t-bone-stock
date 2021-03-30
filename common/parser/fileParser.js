const xlsx = require("xlsx");

const __resourcesDir = `${__dirname}/../../../resources`;

const fileParser = {
    parseXlsxFile : async function(filePath, fileName) {
        const fileFullName = `${__resourcesDir}/${filePath}/${fileName}`;

        const xfile = xlsx.readFile(fileFullName);
        const sheetNames = Object.keys(xfile.Sheets); 
        
        const responseObejct = {}; 
        for(let i = 0; i < sheetNames.length; i++) {
            let sheetName = sheetNames[i];
            responseObejct[sheetName] = xlsx.utils.sheet_to_json(xfile.Sheets[sheetName]);
        }
        
        return responseObejct;
    },
    getCorporateReportsOf : async function(xlxsObject) {
        return await _privateFileParser.getFirstSheetsFromXlsxObject(xlxsObject);
    },
}

const _privateFileParser = {
    getFirstSheetsFromXlsxObject : async function(xlxsObject) {
        const FIRST_SHEET_INDEX = 0;
        const xlxsObjectKeys = Object.keys(xlxsObject)
        const sheetName = xlxsObjectKeys[FIRST_SHEET_INDEX];
        const responseArray = xlxsObject[sheetName];
        return responseArray;
    }
}

module.exports = fileParser;
