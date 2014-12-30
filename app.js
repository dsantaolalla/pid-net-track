var netstat = require('netstat');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var moment = require('moment');

netstat.on( 'stdout', function( netLine ){
	netstat.parse( netLine ).forEach (function (line) {
	//		line['@timestamp']=moment().format();
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
  ttl: '30m',
  body: netstatLine

}, function (error, response) {
  // ...
});

}
