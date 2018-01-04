const getSensorReadings = require('./get-sensor-readings')
const admin = require('firebase-admin')
const serviceAccount = require('/home/pi/sensor-project-firebase-key.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://sensor-project-raspberry.firebaseio.com'
})

const db = admin.database()
const temperatureRef = db.ref('temperature')
const humidityRef = db.ref('humidity')

console.log('Uploading data every 10 seconds...');

setInterval(() => {
	getSensorReadings((err, temperature, humidity) => {
		if(err) {
			return console.error(err)
		}
		temperatureRef.set((temperature || 0.0).toFixed(1))
		humidityRef.set((humidity|| 0.0).toFixed(1))
	})
}, 10000)
