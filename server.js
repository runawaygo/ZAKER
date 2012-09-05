var port = 9001;
var connect = require('connect');
connect()
.use(connect.static(__dirname + '/'))
.listen(port);