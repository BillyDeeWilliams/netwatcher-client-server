'use strict';
const
	fs = require('fs'),
	net = require('net'),

	filename = process.argv[2],

	server = net.createServer(function(connection){

		//reporting
		console.log('subscriber connected.');
		connection.write(JSON.stringify({
			type: "watching",
			file: filename
			}) + '\n');

		//watcher setup
		let watcher = fs.watch( filename, function(){
			connection.write(JSON.stringify({
				type: "changed",
				file: filename,
				timestamp: Date.now()			
			}) + '\n');
		});

		//cleanup
		connection.on('close', function(){
			console.log('subscriber disconeccted.');
			watcher.close();
		});
	});

	if (!filename){

		throw Error('no target file was specified.');
	}; 
	// option in 4 defined setting for theses vlues 
	
	//court,ooen, res

	server.listen(5432, function (){
		console.log('listening for subscribers...')
	});