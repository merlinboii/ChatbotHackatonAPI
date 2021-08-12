require('dotenv').config()
creds = require(process.env.CRED_PATH)
const GoogleSpreadsheet = require('google-spreadsheet')

function saving_d(input) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
      doc.getInfo(function(err, info) {
            sheet = info.worksheets[0];
            sheet.getRows(1,function(err,rows){
                if(err) console.log(err)
                b = rows[rows.length-1].คงเหลือ
                var result = input + parseInt(b)
            const record = {
                วันที่:Date(),
                เงินฝาก:input,
                ถอนเงิน:0,
                คงเหลือ:result
                }
            doc.addRow(1,record,function(err){
                if(err) return err
                })
            })
          });
        
    })
   
} 

function saving_w(input) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[0];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            var result = parseInt(b) - input

        const record = {
            วันที่:Date(),
            เงินฝาก:0,
            ถอนเงิน:input,
            คงเหลือ:result
            }
        sheet.addRow(1,record,function(err){
            if(err) return err
                })
            })
        })
        
    })
} 
exports.savingDeposit = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    res.send('Saving Deposit Success!')
    saving_d(a)
}

exports.savingWithdraw = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    res.send('Saving Withdraw Success!')
    saving_w(a)
}

exports.savingRemain = function(req,res){
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
       doc.getInfo(function(err, info) {
            sheet = info.worksheets[0];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            b = parseInt(b)
            res.json({
                deposit: parseInt(rows[0].เงินฝาก_2) ,
                withdraw: parseInt(rows[0].ถอนเงิน_2),
                remain: b
              });
            })
        })
    })
}
