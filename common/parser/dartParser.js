const {DART_KEY, VALUE_COULUMN} = require('../constant/_dartKey'); 

const dartParser = {
    getAllCompanyNameObjectOf : async function(corporateReports) {

        let companyNameObject = {};

        corporateReports.forEach(rowDataObject => {
            let companyCode = _privateDartParser.getCompanyCodeOf(rowDataObject); 
            let companyName = rowDataObject['회사명'];
            companyNameObject[companyCode] = companyName;  
        });

        return companyNameObject;
        

    },
    getElasticDocumentOf : async function(verifiedCorporateReports, allCompanyNameObject, {year, quarter}) {

        let idx = 0;
        let documents = [];
        for(let companyCode in verifiedCorporateReports) {
            let documentId = _privateDartParser.getDocumentIdForQuarterlyReport({year, quarter, companyCode});
            documents[idx++] = {
                companyCode,
                companyName : allCompanyNameObject[companyCode],
                ...verifiedCorporateReports[companyCode],
                id : documentId
            }
        }
        
        return documents;
    },
    getVerifiedCorporateReportsOf : async function(corporateReports) {
        const secondIndexRowData = corporateReports[1];
        const valueCode = await this.getValueCode(secondIndexRowData);

        let companiesObject = {};
        for(let i = 0; i < corporateReports.length; i++) {
            let rowDataObject = corporateReports[i];
            let companyCode = _privateDartParser.getCompanyCodeOf(rowDataObject);
            let itemCode =  rowDataObject['항목코드'];
            let dartCode = DART_KEY[itemCode];            
            // if(dartCode) {
            //     let value = rowDataObject[valueCode];
            //     companiesObject[companyCode][itemCode] = value;
            // }       
            if(dartCode) {
                if(!companiesObject[companyCode]) companiesObject[companyCode] = {};

                let value = rowDataObject[valueCode];
                companiesObject[companyCode][itemCode] = value;
            }                    
        }

        return companiesObject;
    },
    getValueCode : async function(companyReportsRowData) {
        let valueCode;
        for(let code in companyReportsRowData) {
            if(VALUE_COULUMN[code]) {
                valueCode = code;
                break;
            }
        }
        if(!valueCode) throw new Error(`NOT FOUND VALUE_COULUMN IN '_dartKey.js'`);

        return valueCode;
    },

};

const _privateDartParser = {
    getCompanyCodeOf : function(rowDataObject) {
        // 최초 [001040] 형태에서 코드만 추출
        return rowDataObject['종목코드'].replace('[', '').replace(']','');
    },
    getDocumentIdForQuarterlyReport : function({year, quarter, companyCode}) {
        return `${year}_${quarter}Q${companyCode}`;
    }
};



module.exports = dartParser