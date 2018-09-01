'use strict';

const {dialogflow} = require('actions-on-google');

function sleep(milliseconds){
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++){
		if((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

const functions = require('firebase-functions');

const app = dialogflow({debug: true});

app.intent('soles dolares', (conv, {number}) => {
	var httpReq = new XMLHttpRequest();
    httpReq.open("GET",'http://free.currencyconverterapi.com/api/v6/convert?q=PEN_USD&compact=y',false);
    httpReq.send(null);
    var obj = JSON.parse(httpReq.responseText);
    var rate = obj['PEN_USD']['val'];

    sleep(3000);

    const dollarValue = (number * rate).toFixed(2);
    conv.close('<speak>Eso serían unos <emphasis level = "strong">${dollarValue} dólares</emphasis></speak>');
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);