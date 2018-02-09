const nodemailer = require('nodemailer');

const self_name = 'myLead';
const self_email = 'mylead.enterprise@gmail.com';
const self_subjectUpload = 'Analisando sua base de Leads';
const self_subjectAnalityc = 'Sua base de Leads foi analisada com sucesso';

/*
    Envia email avisando que o arquivo seguiu para análise
*/
function notificationUpload(name, email) {

    const conta = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: self_email,
            pass: 's6g4sdfg5'
        }
    });

    conta.sendMail({
        from: self_name + ' <' + self_email + '>',
        to: name + ' <' + email + '>',
        subject: self_subjectUpload,
        html: `<html><head><meta charset="utf-8"></head><body>
        <div style="padding:0;margin:0">
            <table style="width: 100%; background: #edf3f8" border="0">
                <tbody>
                    <tr>
                        <td>
                            <table style="width:540px; background: #fff; padding: 0 30px; text-align:center;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;margin:0 auto;"
                                border="0">
                                <tbody>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                    <tr style="background: #f5f9fb;">
                                        <td style="padding: 10px 10px 10px 25px; border-top: 1px solid #084553;">
    
                                            <p style="color: #084553; font-weight:800; text-align:center; font-size: 28px; margin-bottom: 10px!important">
                                                Olá, <span style="text-align: center; font-size: 25px; font-weight:800; color: #ff7519">`+ name +
                                                `</span>
                                            </p>
                                        </td>
                                    </tr>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                    <tr style="background: #e1e5e8;">
                                        <td style="padding: 10px 10px 10px 10px; border-top: 1px solid #084553;">
    
                                            <p style="color: #084553; font-weight:800; text-align:center; font-size: 20px; margin-bottom: 10px!important">Obrigado por usar o myLead</p>
                                            <div style="margin-top: -5px">
                                                <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody>
                                                        <tr style="color:#084553">
    
                                                            <!-- preço -->
                                                            <td style="text-align: center; font-weight:600; color: #7f8c8d; padding-top: 8px">
                                                                Sua base de leads está sendo processada nesse exato momento, você receberá outro email 
                                                                quando o processo acabar, e então você poderá vizualisar o resultado.
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>`,
    }, function (err) {
        if (err)
            throw err;

        console.log('E-mail enviado!');
    });
}


/*
    Envia email avisando que o arquivo foi analisado
*/
function notificationAnalityc(name, email) {

    const conta = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: self_email,
            pass: 's6g4sdfg5'
        }
    });

    conta.sendMail({
        from: self_name + ' <' + self_email + '>',
        to: name + ' <' + email + '>',
        subject: self_subjectAnalityc,
        html: `<html><head><meta charset="utf-8"></head><body>
        <div style="padding:0;margin:0">
            <table style="width: 100%; background: #edf3f8" border="0">
                <tbody>
                    <tr>
                        <td>
                            <table style="width:540px; background: #fff; padding: 0 30px; text-align:center;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;margin:0 auto;"
                                border="0">
                                <tbody>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                    <tr style="background: #f5f9fb;">
                                        <td style="padding: 10px 10px 10px 25px; border-top: 1px solid #084553;">
    
                                            <p style="color: #084553; font-weight:800; text-align:center; font-size: 28px; margin-bottom: 10px!important">
                                                Olá, <span style="text-align: center; font-size: 25px; font-weight:800; color: #ff7519">`+ name +
                                                `</span>
                                            </p>
                                        </td>
                                    </tr>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                    <tr style="background: #e1e5e8;">
                                        <td style="padding: 10px 10px 10px 10px; border-top: 1px solid #084553;">
    
                                            <p style="color: #084553; font-weight:800; text-align:center; font-size: 20px; margin-bottom: 10px!important">Obrigado por usar o myLead</p>
                                            <div style="margin-top: -5px">
                                                <table style="width:100%" cellspacing="0" cellpadding="0" border="0">
                                                    <tbody>
                                                        <tr style="color:#084553">
    
                                                            <!-- preço -->
                                                            <td style="text-align: center; font-weight:600; color: #7f8c8d; padding-top: 8px">
                                                                Sua base de leads foi analisada com sucesso, faça login em nosso site para vizualisar o resultado!
                                                                <br/>
                                                                <a style="text-align: center; font-size: 25px; font-weight:800; color: #ff7519" href="http://mylead2-web.herokuapp.com/"> S I T E - M Y L E A D </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
    
                                    <!-- espaçamento -->
                                    <tr style="height: 30px"></tr>
    
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>`,
    }, function (err) {
        if (err)
            throw err;

        console.log('E-mail enviado!');
    });
}



module.exports = {
    notificationUpload: notificationUpload,
    notificationAnalityc: notificationAnalityc

};