const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

//Toggle button disable
const toggleButton = () => (button.disabled = !button.disabled)

// Pass Joke to VoiceRss API
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: '<API KEY>',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    })
}

// Get Jokes from Joke API
const getJoke = async () => {
    let joke = ''
    const apiUrl =
        'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist'

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke
        }
        //text to speech
        toggleButton()
        //disable button
        tellMe(joke)
    } catch (error) {
        console.log('Ooops ', error)
    }
}

/// Event listener
button.addEventListener('click', getJoke)
audioElement.addEventListener('ended', toggleButton)
