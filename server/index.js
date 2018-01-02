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

app.get('/temperature/range', function(req, res) {
	const {start, end} = req.query
	databaseOperations.fetchReadingsBetweenTime(
		'temperature', start, end, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json(results)
	})
})

app.get('/temperature/average', function(req, res) {
	const {start, end} = req.query
	databaseOperations.getAverageOfReadingsBetweenTime(
		'temperature', start, end, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json({
			value: results['avg(value)'].toFixed(1)
		})
	})
})

app.get('/humidity/range', function(req, res) {
	const {start, end} = req.query
	databaseOperations.fetchReadingsBetweenTime(
		'humidity', start, end, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json(results)
	})
})

app.get('/humidity/average', function(req, res) {
	const {start, end} = req.query
	databaseOperations.getAverageOfReadingsBetweenTime(
		'humidity', start, end, (err, results) => {
		if(err) {
			console.error(err)
			return res.status(500).end()
		}
		res.json({
			value: results['avg(value)'].toFixed(1)
		})
	})
})

app.listen(3000, function(){
	console.log('Server listening on port 3000');
});