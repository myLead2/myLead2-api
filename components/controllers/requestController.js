'use strict';
const csv = require('csvtojson')
const fs = require('fs');
const mongoose = require('mongoose'),
    Request = mongoose.model('Request');


function upload(req, res) {
    let id_user = req.url.split('?')[1].split('=')[1];
    let file = req.file.buffer.toString(); 

    //console.log(file);
    let newRequest = null;

    csv({flatKeys:true})
    .fromString(file)
    .on('json',(jsonObj)=>{
        console.log(jsonObj);
        // newRequest = new Request({
        //     'id_user': id_user,
        //     'json_file': {'data': [jsonObj]},
        //     'status': false
        // });

        // newRequest.save();
        
        // res.json({
        //     'status': 'sucess',
        //     'json_file_id': newRequest._id
        // });
       
    })
    .on('done',(error)=>{
        console.log(error);
        res.json({
            'status': 'error',
            'json_file_id': {}
        });
    })
     
    
    

    //let src = fs.createReadStream(tmp_path);
    //let dest = fs.createWriteStream(target_path);

    // src.pipe(dest);
    // src.on('end', function () {
        
    // });
    // src.on('error', function (err) {
    //     res.send('error');
    // });
};



module.exports = {
    upload: upload
};