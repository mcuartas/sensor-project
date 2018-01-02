const getSensorReadings = require('./get-sensor-readings')
const databaseOperations = require('./database-operations')

const cache = {
	temperature: null,
	humidity: null
}

setInterval(() => {
	getSensorReadings((err, temperature, humidity) => {
		if(err) {
			return console.error(err)
		}
		databaseOperations.insertReading('temperature', temperature)
		databaseOperations.insertReading('humidity', humidity)
		cache.temperature = temperature
		cache.humidity = humidity
	})
}, 10000)

module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidity