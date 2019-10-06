// Line Echo Bot ->

const REGION = 'asia-northeast1';
const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer gxKcKN96ioT6jqPbyCbYOEsuNyrZiUizoYkBInUAfkRWs/FaqNgJDbDV4EAK3FASM02QwZecJ28UPkIDkqxKqFdie825S1gItAYcRerj/Zyb+1WVPxnbh00rcRlfvyBrMXNGHkC5W22jstyAiELeGAdB04t89/1O/w1cDnyilFU=`
};

exports.ThailandPostLineBot = functions.region(REGION).https.onRequest((req, res) => {
	if ( typeof(req.body.events) == 'undefined') {
		res.status(200).send("Hello!! Cloud Functions for Firebase!!!").end();
	}
	console.log('Request Body', JSON.stringify(req.body) );
	reply(req.body);
	console.log('Echo bot Complete');
});

const reply = (bodyResponse) => {
	return request({
		method: `POST`,
		uri: `${LINE_MESSAGING_API}/reply`,
		headers: LINE_HEADER,
		body: JSON.stringify({
			replyToken: bodyResponse.events[0].replyToken,
			messages: [
				{
					type: `text`,
					text: bodyResponse.events[0].message.text
				}
			]
		})
	});
};