
const _dartKey = {

        DART_KEY : {
                /* 
                #포괄손익계산서_연결
                ifrs-full_Revenue	매출
                ifrs-full_CostOfSales 매출원가
                ifrs-full_GrossProfit 매출총이익
                dart_OperatingIncomeLoss	영업이익
                ifrs-full_ProfitLoss	 분기순이익
                ifrs-full_ComprehensiveIncome	분기총포괄이익
                ifrs-full_ProfitLossAttributableToAbstract	분기순이익의 귀속
                ifrs-full_EarningsPerShareAbstract	주당이익 [abstract]
                ifrs-full_BasicEarningsLossPerShare	   기본주당이익
                ifrs-full_DilutedEarningsLossPerShare  희석주당이익 
                #재무상태표_연결
                ifrs-full_Assets    자산총계
                ifrs-full_Liabilities   부채총계
                ifrs-full_IssuedCapital      자본금
                ifrs-full_Equity   자본총계
                ifrs-full_EquityAndLiabilities	부채와자본총계
                #현금흐름표_연결
                ifrs-full_CashFlowsFromUsedInOperatingActivities	영업활동 현금흐름
                ifrs-full_CashFlowsFromUsedInInvestingActivities	투자활동 현금흐름
                ifrs-full_CashFlowsFromUsedInFinancingActivities	재무활동 현금흐름
                */
                /*포괄손익계산서_연결*/
                "ifrs-full_Revenue": "fullRevenue",
                "ifrs-full_CostOfSales": "costOfSales",
                "dart_OperatingIncomeLoss": "operatingIncomeLoss",
                "ifrs-full_ProfitLoss": "fullProfitLoss",
                "ifrs-full_ComprehensiveIncome": "fullComprehensiveIncome",
                "ifrs-full_ProfitLossAttributableToAbstract": "fullProfitLossAttributableToAbstract",
                "ifrs-full_BasicEarningsLossPerShare": "fullBasicEarningsLossPerShare",
                "ifrs-full_DilutedEarningsLossPerShare": "fullDilutedEarningsLossPerShare",
                "Ifrs-full_ProfitLossBeforeTax": "Ifrs-full_ProfitLossBeforeTax",
                /*재무상태표_연결  Statement of position */
                "ifrs-full_Assets": "fullAssets", 
                "ifrs-full_Liabilities": "fullLiabilities", 
                "ifrs-full_IssuedCapital": "fullIssuedCapital", 
                "ifrs-full_Equity": "fullEquity", 
                "ifrs-full_EquityAndLiabilities": "fullEquityAndLiabilities",
                "ifrs-full_EquityAttributableToOwnersOfParent": "ifrs-full_EquityAttributableToOwnersOfParent",
                /*현금흐름표_연결 cashflow */
                "ifrs-full_CashFlowsFromUsedInOperatingActivities": "fullCashFlowsFromUsedInOperatingActivities",	
                "ifrs-full_CashFlowsFromUsedInInvestingActivities": "fullCashFlowsFromUsedInInvestingActivities",	
                "ifrs-full_CashFlowsFromUsedInFinancingActivities": "fullCashFlowsFromUsedInFinancingActivities",	
        },
        VALUE_COULUMN : {
                "당기 1분기 3개월" : "당기 1분기 3개월",
                "당기 1분기말" : "당기 1분기말",
                "당기 반기 3개월" : "당기 반기 3개월",
                "당기 반기말" : "당기 반기말",
                "당기 3분기 3개월" : "당기 3분기 3개월",
                "당기 3분기말" : "당기 3분기말",
                "당기" : "당기",
        },

};

module.exports = _dartKey;