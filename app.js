var netstat = require('netstat');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

netstat.on( 'stdout', function( netLine ){
	netstat.parse( netLine ).forEach (function (line) {
			line.time=""+new Date();
			console.log(line);		
			publishToElasticSearch(line);
		});
});

netstat.on( 'stderr', function( err ) {
	process.stderr.write( err );
});

function publishToElasticSearch(netstatLine) {

	client.create({
  index: 'netstat',
  type: 'mytype',  
  body: netstatLine
}, function (error, response) {
  // ...
});

}