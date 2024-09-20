const params = new URLSearchParams(location.search);
const battery = params.get('battery');
const mode = params.get('mode');

const appURL = new URL('lionsystems:');
appURL.pathname = '//connect/';
appURL.searchParams.append('battery', battery);
appURL.searchParams.append('mode', mode);

document.getElementById('title').innerHTML = battery;

function connect() {
	if (!battery) return;

	try {
		window.location = appURL;
	} catch (e) {
		if (e.toString().includes('NS_ERROR_UNKNOWN_PROTOCOL'))
			console.log('App not detected');
	}
}
