var express = require('express')
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Databases')
    .then(() => console.log('Connected!'));

var NhanVienModel = require('./NhanVienModel');
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/add", function (req, res) {
    res.render("add");
})
app.post("/add", async (req, res) => {
    var txtten = req.body.txtten;
    var txtdiachi = req.body.txtdiachi;
    var txtluong = req.body.txtluong;
    var formNhap = new NhanVienModel({
        ten: txtten,
        diachi: txtdiachi,
        luong: txtluong
    })
    try {
        await formNhap.save();
        res.redirect("./list");
    } catch (error) {
        console.log(error);
    }
})
app.get("/list", function (req, res) {
    NhanVienModel.find({})
        .then(danhsach => { res.render('list', { danhsach: danhsach }) })
        .catch(err => {
            console.log(err);
        })
});
app.get("/edit/:id", function (req, res) {
    NhanVienModel.find({})
        .then(danhsachedit => { res.render('edit', { danhsachedit: danhsachedit }) })
        .catch(err => {
            console.log(err);
        })
});
app.post("/edit", async (req, res) => {
    try {
        await NhanVienModel.updateOne({ _id: req.body.IDChar }, {
            ten: req.body.txtten,
            diachi: req.body.txtdiachi,
            luong: req.body.txtluong
        }, function (err) {
            if (err) {
                res.json({ "kq": 0, "errMsg": err });
            } else {
                res.redirect("./list");
            }
        })
    } catch (error) {
        console.log(error);
    }
})
app.get("/delete/:id", function (req, res) {
    let _id = req.params.IDChar;
    NhanVienModel.deleteOne()
        .then(_id => {
            res.redirect("../list");
        })
        .catch(err => {
            console.log(err);
        })
})
