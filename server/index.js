const express = require('express');
const app = express();
const path = require('path')
const getCachedSensorReadings = require('./get-cached-sensor-readings')
const databaseOperations = require('./database-operations')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {
	res.json({
		value: (getCachedSensorReadings.getTemperature() || 0.0).toFixed(1)
	})
})

app.get('/humidity', function(req, res) {
	res.json({
		value: (getCachedSensorReadings.getHumidity() || 0.0).toFixed(1)
	})
});

app.get('/temperature/history', function(req, res) {
	databaseOperations.fetchLatestReadings('temperature', 10, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json(results.reverse())
	})
})

app.get('/humidity/history', function(req, res) {
	databaseOperations.fetchLatestReadings('humidity', 10, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json(results.reverse())
	})
})

app.listen(3000, function(){
	console.log('Server listening on port 3000');
});