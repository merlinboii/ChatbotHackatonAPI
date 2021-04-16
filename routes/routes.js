'use strict'
module.exports = function(app){
    var controller = require('../controller/controllers')

    app.route('/saving_d')
    .get(controller.savingDeposit)
    app.route('/saving_w')
    .get(controller.savingWithdraw)
    app.route('/remainSaving')
    .get(controller.savingRemain)

    app.route('/invest_d')
    .get(controller.investDeposit)
    app.route('/invest_w')
    .get(controller.investWithdraw)
    app.route('/remainInvest')
    .get(controller.investRemain)

    app.route('/budget_d')
    .get(controller.budgetDeposit)
    app.route('/budget_w')
    .get(controller.budgetWithdraw)
    app.route('/remainBudget')
    .get(controller.budgetRemain)

    app.route('/visualize')
    .get(controller.virsualize)
    app.route('/summarize')
    .get(controller.summarize)

}