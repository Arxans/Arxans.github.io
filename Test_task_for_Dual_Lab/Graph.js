function getWeekDay(date) {
    var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    var day = date.getDay();
    date.setDate(date.getDate() - 1);

	return days[day];
}
var Data = new Date();
var i = 0, arr = []; 
Data.setDate(Data.getDate() + 1);
while (i < 7) {
	arr[i] = getWeekDay(Data) + " " + Data.toLocaleDateString();
	i++;
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [arr[6], arr[5], arr[4], arr[3], arr[2], arr[1], 
        		 arr[0]],
        datasets: [{
            label: "График курсов за последнюю неделю",
            backgroundColor: 'rgb(100, 100, 150)',
            borderColor: 'rgb(255, 99, 132)',
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'yellow',
            data: [5, 10, 3, 10, 20, 50, 45],
        }]
    },

    // Configuration options go here
    options: {}
});