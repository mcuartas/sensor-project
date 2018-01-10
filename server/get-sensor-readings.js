
const sensor = require('node-dht-sensor')

const getSensorReadings = (callback) => {
	sensor.read(22, 4, function(err, temperature, humidity) {
		if(err) {
			return callback(err)
		}
		callback(null, temperature, humidity)
	})
}

/*
const getSensorReadings = (callback) => {
	callback(null, Math.random() * 100, Math.random() * 100)
}
*/

module.exports = getSensorReadings

