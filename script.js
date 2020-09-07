const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button

function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API

function tellMe(joke) {
    VoiceRSS.speech({
        key: 'eacf5c7cfb3a4b6b96e4123499cf1c3e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch errors here
        console.log('Failed to get joke.', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
