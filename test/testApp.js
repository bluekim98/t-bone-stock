/**
 *  Test Application 
 */

const testModuleObject = {
    'common'  : [
        'parser/fileParserTest',
        'parser/dartParserTest',
        'util/dateUtilTest',
    ],
    'service' : [

    ],
};

(async function() {
    for(let layer in testModuleObject) {
        let moduleNamesGroupByLayer = testModuleObject[layer];

        for(let i = 0; i < moduleNamesGroupByLayer.length; i++) {

            let testModuleName = moduleNamesGroupByLayer[i];
            let requireModuleName = `./${layer}/${testModuleName}`;
            let testModule = require(requireModuleName);

            await testModule();
        }
    }
})();



