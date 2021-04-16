
creds = require('../credentials.json')
const GoogleSpreadsheet = require('google-spreadsheet')

//================ SAVING ================== //
function saving_d(input) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
      /*   doc.getRows(1,function(err,rows){
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
        }) */
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

//================ Investment ================== //
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

//================= Budget ================//

function Budget_d(input,type,detail) {
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[2];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)
            b = rows[rows.length-1].คงเหลือ
            var result = parseInt(b) + input

            const record = {
                วันที่: Date(),
                หมวดหมู่: type,
                รายละเอียด: detail,
                รายรับ: input,
                รายจ่าย: 0,
                คงเหลือ: result,
                }
        doc.addRow(3,record,function(err){
            if(err) return err
                })
            })
        })
        
    })
} 

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

//================= ALL ================//
exports.virsualize = function(req,res){
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var b
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet = info.worksheets[3];
            sheet.getRows(1,function(err,rows){
            if(err) console.log(err)

            res.json({
                saving: parseInt(rows[0].บัญชีเงินเก็บ) ,
                budget: parseInt(rows[0].บัญชีใช้จ่าย),
                invest: parseInt(rows[0].บัญชีลงทุน),
                remain: parseInt(rows[1].บัญชีเงินเก็บ)
              });
            })
        })
    })
}

exports.summarize = function(req,res){
    const doc = new GoogleSpreadsheet('1eK1E6G6gPLy_DJFGa1KK_kRUwrr7ehS-JaqXHJVX9cU')
    var s , e
    doc.useServiceAccountAuth(creds,function(err){
        if (err) return console.log(err)
        doc.getInfo(function(err, info) {
            sheet_0 = info.worksheets[0];
            sheet_1 = info.worksheets[1];
            sheet_2 = info.worksheets[2];
            sheet_0.getRows(1,function(err,rows){
            if(err) console.log(err)
                s = rows[0].สุทธิ

            })
            sheet_2.getRows(1,function(err,rows){
                if(err) console.log(err)
                e = rows[10]._cyevm
                })
                if (s < 3*parseInt(e)){
                    res.json({
                        message: 'คุณมีเงินเก็บสำรองฉุกเฉินยังไม่ถึง 3 เท่าของค่าใช้จ่ายปัจจุบัน'
                      })
                }
                else if (s > 6*parseInt(e)){
                    res.json({
                        message: 'คุณมีเงินเก็บสำรองฉุกเฉินมากกว่า 6 เท่าของค่าใช้จ่ายปัจจุบัน'
                      })
                }
                else {
                    res.json({
                        message: 'มาตรฐาน'
                      })
                }
        })
    })
}
