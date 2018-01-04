const getSensorReadings = require('./get-sensor-readings')

var admin = require('firebase-admin')
var serviceAccount = require('/home/pi/sensor-project-firebase-key.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://sensor-project-raspberry.firebaseio.com'
})

const db = admin.database()
const temperatureRef = db.ref('temperature')
const humidityRef = db.ref('humidity')

setInterval(() => {
	getSensorReadings((err, temperature, humidity) => {
		if(err) {
			return console.error(err)
		}
		temperatureRef.set(temperature)
		humidityRef.set(humidity)
	})
}, 4000)
