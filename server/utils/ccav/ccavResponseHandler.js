var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');
	 require('dotenv').config();

exports.postRes = function(request,response){
    let ccavEncResponse = '';
    let ccavResponse = '';
    const workingKey = process.env.CCAV_WORKING_5173 || '9D6E5C9C2F92978AF9729AB20EE968D5';
    let ccavPOST = '';
	
       request.on('data', function (data) {
        ccavEncResponse += data;
        console.log('Response Data:', ccavEncResponse);
        ccavPOST = qs.parse(ccavEncResponse);
        const encryption = ccavPOST.encResp;
        ccavResponse = ccav.decrypt(encryption, workingKey);
        console.log('Decrypted Response:', ccavResponse);
    });

	request.on('end', function () {
        let pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>';
        pData += ccavResponse.replace(/=/gi, '</td><td>').replace(/&/gi, '</td></tr><tr><td>');
        pData += '</td></tr></table>';
        const htmlcode = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>${pData}</center><br></body></html>`;
        response.writeHeader(200, { 'Content-Type': 'text/html' });
        response.write(htmlcode);
        response.end();
    });
};
