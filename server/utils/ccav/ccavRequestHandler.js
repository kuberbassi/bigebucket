var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');
    require('dotenv').config();

exports.postReq = function(request,response){
    let body = '';
    const workingKey = process.env.CCAV_WORKING_5173 || '9D6E5C9C2F92978AF9729AB20EE968D5';
    const accessCode = process.env.CCAV_ACCESS_5173 || 'ATCQ06MI58CC86QCCC';
    let encRequest = '';
    let formbody = '';
				
    request.on('data', function (data) {
        body += data;
        console.log('Request Data:', body);
        encRequest = ccav.encrypt(body, workingKey);
        console.log('Encrypted Request:', encRequest);
        formbody = `<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}"><input type="hidden" name="access_code" id="access_code" value="${accessCode}"><script language="javascript">document.redirect.submit();</script></form>`;
    });
				
    request.on('end', function () {
        response.writeHeader(200, { 'Content-Type': 'text/html' });
        response.write(formbody);
        response.end();
    });
   
};
