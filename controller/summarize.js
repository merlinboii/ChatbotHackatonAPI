require('dotenv').config()
creds = require(process.env.CRED_PATH)
const GoogleSpreadsheet = require('google-spreadsheet')

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
