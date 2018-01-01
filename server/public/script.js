const fetchTemperature = () => {
	fetch('/temperature')
	.then(results => {
		return results.text()
	})
	.then(text => {
		const temperatureDisplay = document.getElementById('temperature-display')
		temperatureDisplay.innerHTML = text
	})
}

const fetchHumidity = () => {
	fetch('/humidity')
	.then(results => {
		return results.text()
	})
	.then(text => {
		const humidityDisplay =document.getElementById('humidity-display')
		humidityDisplay.innerHTML = text
	})
}

setInterval(() => {
	fetchTemperature()
	fetchHumidity()
}, 10000)

const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')
const temperatureChart = new Chart(temperatureCanvasCtx, {
	type: 'line',
	data: {
		labels: ['10:30', '10:31', '10:32', '10:33'],
		datasets: [{
			data: [12, 19, 23, 17],
			backgroundColor: 'rgba(255, 205, 210, 0.5)'
		}]
	},
	options: {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false
	}
})
