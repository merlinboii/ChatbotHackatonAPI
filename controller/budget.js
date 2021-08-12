require('dotenv').config()
creds = require(process.env.CRED_PATH)
const GoogleSpreadsheet = require('google-spreadsheet')

function Budget_w(input,type,detail) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[2];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            var result = parseInt(b) - input

        const record = {
            วันที่: Date(),
            หมวดหมู่: type,
            รายละเอียด: detail,
            รายรับ: 0,
            รายจ่าย: input,
            คงเหลือ: result,
            }
        doc.addRow(3,record,function(err){
            if(err) return err
                })
            })
        })
        
    })
} 

exports.budgetDeposit = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    var type = input.type
    var detail = input.detail
    res.send('Income Success!')
    Budget_d(a,type,detail)
}

exports.budgetWithdraw = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    var type = input.type
    var detail = input.detail
    res.send('Expense Success!')
    Budget_w(a,type,detail)
}

exports.budgetRemain = function(req,res){
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[2];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            b = parseInt(b)
            var result =  parseInt(rows[2]._cyevm) -  parseInt(rows[10]._cyevm)
            res.json({
                deposit: parseInt(rows[2]._cyevm) ,
                withdraw: parseInt(rows[10]._cyevm),
                remain: result
              });
            })
        })
    })
}
