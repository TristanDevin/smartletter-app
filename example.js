'use strict';

var ttn = require('ttn');
const { base64encode, base64decode} = require('nodejs-base64');

var appEUI = 'smart-letter@ttn';
var accessKey = 'NNSXS.KXBZWVHPB3N62GKK45LXIBPUJ3Y7NOYPZAX2BNY.P77BFQD3FP3YIQMCHE4C557BYMHLOI4YGQ2H6WNEHJJCRR56PFNQ';

var client = new ttn.Client('eu1.cloud.thethings.network', appEUI, accessKey);

client.on('connect', function () {
	console.log('[DEBUG]', 'Connected');
});

client.on('error', function (err) {
	console.error('[ERROR]', err.message);
});

client.on('activation', function (e) {
	console.log('[INFO] ', 'Activated: ', e.devEUI);
});

client.on('uplink', function (msg) {
	console.info('[INFO] ', 'Uplink: ' + JSON.stringify(msg, null, 2));
});

client.on('uplinkTopic', function (msg) {

	
	var rawData = msg.payload.uplink_message.frm_payload;
	var buf = Buffer.from(rawData, 'base64').toString('ascii');
	console.log('[RECEPTION]', '| Capteur :', buf , '| Timestamp :', msg.payload.received_at );
	
	

});

client.on('uplink', function (msg) {

	// respond to every third message
	if (msg.counter % 3 === 0) {
		console.log('[DEBUG]', 'Downlink');

		var payload = new Buffer('4869', 'hex');
		client.downlink(msg.devEUI, payload);
	}
});