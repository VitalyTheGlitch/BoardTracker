const params = new URLSearchParams(location.search);
const battery = params.get('battery');
const mode = params.get('mode');

const url = new URL('board-tracker:');
url.pathname = '//connect/';
url.searchParams.append('battery', battery);
url.searchParams.append('mode', mode);

document.getElementById('title').innerHTML = battery;

const connect = () => {
	if (!battery) return;

	const answer = confirm('Скачайте Board Tracker, чтобы подключиться к ' + battery + '!');

	if (answer) window.open(url.toString(), '_blank');
}
