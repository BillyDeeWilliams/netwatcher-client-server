'use strict';

const
	
	net = require('net'),
	client = net.connect(5432);
	
	client.on('data', function (data){
		
		let message = JSON.parse(data);
		
		if (message.type == 'watching'){
			console.log('now watching: ' + message.file);
			//do something with the watching report message
		}else if ( message.type == 'changed'){
			// do something with the changed report message
			let date = new Date (message.timesamp);
			console.log('file: "' + message.file + '" changed at ' + date );
			
			
		}else {
			throw Error('unrecognizable message type: ' + message.type);
		}
		
	});