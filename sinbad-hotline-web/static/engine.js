const MAIN_MENU = 'mainmenu';
const RING_1 = 'ring1';
const SILENCE_5s = 'silence5s';
const ROTARY_PHONE = 'rotaryphone';
const SURVEY = 'survey';
const MUSIC_1_30S = 'music1_30s';
const MUSIC_2_25S = 'music2_25s';
const YOU_MAY_REMEMBER = 'youmayremember';
const THANK_YOU = 'thankyou';
const RING_3 = 'ring3';
const SINBAD_VOICEMAIL = 'sinbad-voicemail';
const BRENDAN_VOICEMAIL = 'brendan-voicemail';
const COLLECTING_CHECKS = 'collectingchecks';
const WEBSITE = 'website';
const SINBAD_BUSY = 'sinbadisbusy';
const TIRED_OF_WAITING = 'tiredofwaiting';
const CALL_DOESNT_MATTER = 'calldoesntmatter';
const CALL_IS_IMPORTANT = 'callisimportant';
const BLOOD_OF_INNOCENTS = 'bloodofinnocents';
const GOATS = 'goats';
const WITH_YOU_FOREVER = 'withyouforever';
const HIRE_SINBAD = 'hiresinbad';
const EMERGENCY = 'emergency';
const DTMF_1 = 'dtmf_1';
const DTMF_2 = 'dtmf_2';
const DTMF_3 = 'dtmf_3';
const DTMF_4 = 'dtmf_4';
const DTMF_5 = 'dtmf_5';
const DTMF_6 = 'dtmf_6';
const DTMF_7 = 'dtmf_7';
const DTMF_8 = 'dtmf_8';
const DTMF_9 = 'dtmf_9';
const DTMF_STAR = 'dtmf_star';
const DTMF_0 = 'dtmf_0';
const DTMF_POUND = 'dtmf_pound';

const audios = {
    [MAIN_MENU]: document.getElementById(MAIN_MENU),
    [RING_1]: document.getElementById(RING_1),
    [SILENCE_5s]: document.getElementById(SILENCE_5s),
    [ROTARY_PHONE]: document.getElementById(ROTARY_PHONE),
    [SURVEY]: document.getElementById(SURVEY),
    [MUSIC_1_30S]: document.getElementById(MUSIC_1_30S),
    [MUSIC_2_25S]: document.getElementById(MUSIC_2_25S),
    [YOU_MAY_REMEMBER]: document.getElementById(YOU_MAY_REMEMBER),
    [THANK_YOU]: document.getElementById(THANK_YOU),
    [RING_3]: document.getElementById(RING_3),
    [SINBAD_VOICEMAIL]: document.getElementById(SINBAD_VOICEMAIL),
    [BRENDAN_VOICEMAIL]: document.getElementById(BRENDAN_VOICEMAIL),
    [COLLECTING_CHECKS]: document.getElementById(COLLECTING_CHECKS),
    [WEBSITE]: document.getElementById(WEBSITE),
    [SINBAD_BUSY]: document.getElementById(SINBAD_BUSY),
    [TIRED_OF_WAITING]: document.getElementById(TIRED_OF_WAITING),
    [CALL_DOESNT_MATTER]: document.getElementById(CALL_DOESNT_MATTER),
    [CALL_IS_IMPORTANT]: document.getElementById(CALL_IS_IMPORTANT),
    [BLOOD_OF_INNOCENTS]: document.getElementById(BLOOD_OF_INNOCENTS),
    [GOATS]: document.getElementById(GOATS),
    [WITH_YOU_FOREVER]: document.getElementById(WITH_YOU_FOREVER),
    [HIRE_SINBAD]: document.getElementById(HIRE_SINBAD),
    [EMERGENCY]: document.getElementById(EMERGENCY),
    [DTMF_1]: document.getElementById(DTMF_1),
    [DTMF_2]: document.getElementById(DTMF_2),
    [DTMF_3]: document.getElementById(DTMF_3),
    [DTMF_4]: document.getElementById(DTMF_4),
    [DTMF_5]: document.getElementById(DTMF_5),
    [DTMF_6]: document.getElementById(DTMF_6),
    [DTMF_7]: document.getElementById(DTMF_7),
    [DTMF_8]: document.getElementById(DTMF_8),
    [DTMF_9]: document.getElementById(DTMF_9),
    [DTMF_STAR]: document.getElementById(DTMF_STAR),
    [DTMF_0]: document.getElementById(DTMF_0),
    [DTMF_POUND]: document.getElementById(DTMF_POUND),
};

const state = {
    volume: 0.8,
    currentAudio: null,
    on: false,
    keyListeners: {},
    usedListener: false,
    ringing: false,
};

const dtmfMap = {
    '1': DTMF_1,
    '2': DTMF_2,
    '3': DTMF_3,
    '4': DTMF_4,
    '5': DTMF_5,
    '6': DTMF_6,
    '7': DTMF_7,
    '8': DTMF_8,
    '9': DTMF_9,
    '*': DTMF_STAR,
    '0': DTMF_0,
    '#': DTMF_POUND,
};

function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function goToFlow (flowName) {
    console.log('goToFlow', flowName);
    state.usedListener = false;
    // do nothing when user presses 1-9,*,# until listenKeys() is called
    clearListeners();
    // stop playing any previous file
    stop();
    // find the flow details by name
    const flow = flows.find(({name}) => name === flowName);
    if (!flow) {
        return;
    }
    // play some thing before doing a menu?
    if (flow.play) {
        // play this first, wait until it's done
        try {
            await play(flow.play);
        } catch (e) {
            console.error(e);
        }
    }
    if (flow.background) {
        // main audio file play
        // allow barge
        setListeners(flow.extensions);
        // play the main audio file
        try {
            await play(flow.background);
        } catch (e) {
            console.error(e);
        }
        // if we wait before doing a goto
        if (flow.wait) {
            // wait before goTo
            await sleep(flow.wait * 1000);
        }
        // if valid key pressed during sleep
        if (state.usedListener) {
            // don't process goTo
            return;
        }
    }
    if (flow.goTo) {
        goToFlow(flow.goTo);
    }
    // if (flow.record) {
    //     console.log('toggleRecording')
    //     startRecording();
        
    //     await sleep(60 * 1000);
    //     stopRecording();
    // }
}

function clearListeners () {
    state.keyListeners = {};
}

function setListeners (extensions) {
    state.keyListeners = extensions;
}

/**
 * @param {string} key the button pressed, such as '1', '2', '*', '#', etc.
 * @returns void
 */
async function press (key) {
    // stop playing current file unless ringing
    if (!state.ringing) {
        stop();
    }
    // play DTMF tone at half of state volume
    try {
        await play(dtmfMap[key], state.volume * 0.3);
    } catch (e) {
        console.error(e);
    }
    // direct match
    const flowName = state.keyListeners[key];
    if (flowName) {
        state.usedListener = true;
        goToFlow(flowName);
        return;
    }
    // any other key match 'i'
    const fallbackFlowName = state.keyListeners['i'];
    if (fallbackFlowName) {
        state.usedListener = true;
        goToFlow(fallbackFlowName);
        return;
    }
    // no match
    // TODO repeat?
    return;
}

function onOff () {
    if (state.on) {
        stop();
    } else {
        start();
    }
    state.on = !state.on;
}

function pressSpeaker () {
    console.log('pressSpeaker');
    onOff();
}

function pressLine1 () {
    console.log('pressLine1');
    onOff();
}

function pressRedial () {
    console.log('pressRedial');
    stop();
    start();
}

function pressNewCall () {
    console.log('pressNewCall');
    stop();
    start();
}

function pressVolumeUp () {
    console.log('pressVolumeUp');
    setStateVolume(state.volume + 0.1);
    updateCurrentlyPlayingVolume();
    console.log('volume now', state.volume);
}

function pressVolumeDown () {
    console.log('pressVolumeDown');
    setStateVolume(state.volume - 0.1);
    updateCurrentlyPlayingVolume();
    console.log('volume now', state.volume);
}

function setStateVolume (value) {
    if (value < 0.0) {
        state.volume = 0.0;
        return;
    }
    if (value > 1.0) {
        state.volume = 1.0;
        return;
    }
    state.volume = value;
}

function updateCurrentlyPlayingVolume () {
    const currentlyPlaying = audios[state.currentAudio];
    if (currentlyPlaying) {
        currentlyPlaying.volume = state.volume;
    }
}

function start () {
    console.log('start');
    goToFlow('sinbad-main');
}

function stop () {
    console.log('stop');
    // pause current audio
    if (state.currentAudio) {
        // stop playback
        audios[state.currentAudio].pause();
        // rewind audio
        audios[state.currentAudio].currentTime = 0;
    }
    // stop recording
    // stopRecording();
}

/**
 * set state.currentAudio and play the file
 * @returns {Promise<void>} promise resolves when the audio file has ended
 */
function play (id, volume) {
    return new Promise((resolve, reject) => {
        console.log('play', id);
        state.currentAudio = id;
        if (id === RING_1 || id === RING_3) {
            state.ringing = true;
        }
        const sound = audios[id];
        if (!sound) {
            reject(`could not play ${id} - sound not defined`);
            return;
        }
        if (typeof volume === 'number') {
            sound.volume = volume;
        } else {
            sound.volume = state.volume;
        }
        sound.play();
        sound.onended = (event) => {
            state.ringing = false;
            resolve();
        }
        sound.onerror = (err) => {
            state.ringing = false;
            reject(err);
        }
    })
}