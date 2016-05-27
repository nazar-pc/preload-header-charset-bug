var express = require('express'),
	app     = express();
app
	.use('/js', express.static('js'))
	.get('/', function (req, res) {
		res.setHeader('Link', '<js/preload-header.js>; rel=preload; as=script');
		res.send(`
<!doctype html>
<meta charset="utf-8">
<link rel="preload" href="js/preload-tag.js" as="script">
<script src="js/preload-header.js"></script>
<script src="js/preload-tag.js"></script>
<script src="js/no-preload.js"></script>
<script>
	console.log('Correct: Кириллиця');
	console.log('Preload header: ' + preload_header);
	console.log('Preload tag: ' + preload_tag);
	console.log('No preload: ' + no_preload);
</script>
`);
	})
	.get('/bom', function (req, res) {
		res.setHeader('Link', '<js/preload-header.js>; rel=preload; as=script');
		res.setHeader('Link', '<js/preload-header-with-bom.js>; rel=preload; as=script');
		res.send(`
<!doctype html>
<meta charset="utf-8">
<link rel="preload" href="js/preload-tag.js" as="script">
<script src="js/preload-header.js"></script>
<script src="js/preload-header-with-bom.js"></script>
<script src="js/preload-tag.js"></script>
<script src="js/no-preload.js"></script>
<script>
	console.log('Correct: Кириллиця');
	console.log('Preload header: ' + preload_header);
	console.log('Preload header with BOM in file (affects ^, which was broken without this file): ' + preload_header_with_bom);
	console.log('Preload tag: ' + preload_tag);
	console.log('No preload: ' + no_preload);
</script>
`);
	})
	.listen(9876, function () {
		console.info('Open browser at http://localhost:9876/ and http://localhost:9876/bom and take a look at the console');
	});
