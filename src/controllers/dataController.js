const crypto = require('crypto');
const xlsxtojson = require('xlsx-to-json');
const multer = require('multer');
const fileExtension = require('file-extension');
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        conn.query('SELECT * FROM dataApp', (err, data_) => {
            if (err) {
                res.json(err);
            }
            res.render('index', {
                data: data_
            });
        })
    });
};

controller.save = (req, res) => {
    const data_ = req.body;
    console.log(data_);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO dataApp set ?', [data_], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        });
    });
}

controller.update = (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('UPDATE dataApp set ? WHERE id = ?', [newData, id], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/')
        })
    });
}

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM dataApp WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/input/')
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage: storage }).single('file');

controller.import = (req, res) => {
    let excel2json;
    upload(req, res, (err) => {
        if (err) {
            res.json({ error_code: 401, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 404, err_desc: "No file passed" });
            return;
        }
        /** SET nodejs package as per the file received...*/
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            excel2json = xlsxtojson;
        }
        excel2json(obj = {
            input: req.file.path, // input xls 
            output: "src/output/" + Date.now() + ".json", // output json 
            lowerCaseHeaders: true
        }, (err, result) => {
            var myArray = [];
            if (err) {
                res.json(err);
                console.log(err);
            } else {
                var array = result.map(item => {
                    return {
                        partNumber: item['Part Number'],
                        description1: item.Description,
                        quantity: item.Quantity,
                        unit: item.Unit,
                        unitPrice: item['Unit Price']
                    };
                });

                result.forEach((element, i) => {
                    delete element['Subtotal Total'];
                    if (array[i].partNumber) {
                        myArray[i] = array[i];
                        req.getConnection((err, conn) => {
                            conn.query('INSERT INTO dataApp set ?', [myArray[i]], (err, rows) => {
                                if (err) {
                                    res.json(err);
                                }
                                res.redirect('/');
                            });
                        })
                    } else {
                        delete array[i];
                    }
                });
                console.log(myArray);
            }
        });
    })
}


module.exports = controller;