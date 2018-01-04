
const temperatureCanvasCtx = document
	.getElementById('temperature-chart')
	.getContext('2d')

const temperatureChartConfig = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			data: [],
			backgroundColor: 'rgba(255, 205, 210, 0.5)'
		}]
	},
	options: {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				ticks: {
					suggestedMin: 10,
					suggestedMax: 40
				}
			}]
		}
	}
}
const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)

const humidityCanvasCtx = document
	.getElementById('humidity-chart')
	.getContext('2d')

const humidityChartConfig = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			data: [],
			backgroundColor: 'rgba(197, 202, 233, 0.5)'
		}]
	},
	options: {
		legend: {
			display: false
		},
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				ticks: {
					suggestedMin: 30,
					suggestedMax: 90
				}
			}]
		}
	}
}
const humidityChart = new Chart(humidityCanvasCtx, humidityChartConfig)

const pushData = (arr, value, maxLen) => {
	arr.push(value)
	if (arr.length > maxLen) {
		arr.shift()
	}
}

const temperatureDisplay = document.getElementById('temperature-display')
const humidityDisplay = document.getElementById('humidity-display')

const fetchTemperature = () => {
	
}

const fetchHumidity = () => {
	
}

const fetchTemperatureHistory = () => {
	
}

const fetchHumidityHistory = () => {
	
}

function getParameterByName(name) {
	const url = window.location.href
	name = name.replace(/[\[\]]/g, '\\$&')
	const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
	const results = regex.exec(url)
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ''))
}

const fetchTemperatureRange = () => {

}

const fetchHumidityRange = () => {

}

if (!getParameterByName('start') && !getParameterByName('end')) {
	
	setInterval(() => {
		fetchTemperature()
		fetchHumidity()
	}, 2000)
	fetchHumidityHistory()
	fetchTemperatureHistory()
}
else
{
	fetchTemperatureRange()
	fetchHumidityRange()
}
