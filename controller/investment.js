require('dotenv').config()
creds = require(process.env.CRED_PATH)
const GoogleSpreadsheet = require('google-spreadsheet')

function Investment_d(input,type) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[1];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            var result = parseInt(b) + input

        const record = {
            วันที่: Date(),
            หมวดหมู่: type,
            เงินฝาก: input,
            ถอนเงิน: 0,
            คงเหลือ: result,
            }
        doc.addRow(2,record,function(err){
            if(err) return err
                })
            })
        })
        
    })
} 

function Investment_w(input,type) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[1];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            var result = parseInt(b) - input

        const record = {
            วันที่: Date(),
            หมวดหมู่: type,
            เงินฝาก: 0,
            ถอนเงิน: input,
            คงเหลือ: result,
            }
        doc.addRow(2,record,function(err){
            if(err) return err
                })
            })
        })
        
    })
} 

exports.investDeposit = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    var type = input.type
    res.send('Invest deposit Success!')
    Investment_d(a,type)
}

exports.investWithdraw = function(req,res){
    var input = req.query;
    var a = parseInt(input.a) || 0;
    var type = input.type
    res.send('Invest withdraw Success!')
    Investment_w(a,type)
}

exports.investRemain = function(req,res){
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[1];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            b = parseInt(b)
            res.json({
                deposit: parseInt(rows[0].สุทธิ) ,
                withdraw: parseInt(rows[1].สุทธิ),
                remain: b
              });
            })
        })
    })
}