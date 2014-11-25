// Load dependency
var solrSmartClient = require('../lib/index.js');

// Define options
options = {
    // Options passed verbatim to node-zookeeper-client
    zk: {
        connectionString: 'htz-slr02:2181,htz-slr03:2181',
        liveNodes: '/live_nodes'
    },
    // Options passed verbatim to node-rest-client
    rest: {
        requestConfig: {
            timeout: 3000
        },
        responseConfig: {
            timeout: 1000
        }
    },
    solr: {
        protocol: 'http',
        collectionsGetEndPoint: '/admin/collections?action=LIST'
    },
    ssh: {}
};

// Create Solr client, execute query and print number of documents in response.
solrSmartClient.createClient('search-dev', options, function (err, solrClient) {
    if (err) {
        return console.log(err);
    }
    solrClient.search('q=*:*', function (err, obj) {
        if (err) {
            return console.log(err);
        }
        console.log('Number of documents found: %d', obj.response.numFound);
    })
});