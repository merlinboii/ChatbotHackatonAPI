'use strict'
module.exports = function(app){
    var saving = require('../controller/saving')
    var invest = require('../controller/investment')
    var budget = require('../controller/budget')
    var sum = require('../controller/summarize')

    app.route('/saving_d')
    .get(saving.savingDeposit)
    app.route('/saving_w')
    .get(saving.savingWithdraw)
    app.route('/remainSaving')
    .get(saving.savingRemain)

    app.route('/invest_d')
    .get(invest.investDeposit)
    app.route('/invest_w')
    .get(invest.investWithdraw)
    app.route('/remainInvest')
    .get(invest.investRemain)

    app.route('/budget_d')
    .get(budget.budgetDeposit)
    app.route('/budget_w')
    .get(budget.budgetWithdraw)
    app.route('/remainBudget')
    .get(budget.budgetRemain)

    app.route('/visualize')
    .get(sum.virsualize)
    app.route('/summarize')
    .get(sum.summarize)

}