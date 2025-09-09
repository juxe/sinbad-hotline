// export const name = "flow";

const flows = [{
    name: 'sinbad-main',
    play: 'ring1',
    background: 'mainmenu',
    wait: 5,
    goTo: 'sinbad-rotary',
    extensions: {
        '0': 'sinbad-speak-directly',
        '1': 'sinbad-money',
        '2': 'sinbad-beef',
        '3': 'sinbad-great',
        '4': 'sinbad-shazam',
        '5': 'sinbad-memorabilia',
        '6': 'sinbad-hire',
        '7': 'sinbad-hire',
        '8': 'sinbad-goats-music',
        'i': 'sinbad-rotary',
        '*': 'sinbad-brendan-voicemail-ring',
    }
}, {
    name: 'sinbad-money',
    background: 'survey',
    goTo: 'sinbad-money-music',
    extensions: {
        'i': 'sinbad-money-music'
    }
}, {
    name: 'sinbad-beef',
    background: 'survey',
    goTo: 'sinbad-beef-music',
    extensions: {
        'i': 'sinbad-beef-music'
    }
}, {
    name: 'sinbad-rotary',
    background: 'rotaryphone',
    goTo: 'sinbad-speak-directly',
    extensions: {
        'i': 'sinbad-speak-directly'
    }
}, {
    name: 'sinbad-speak-directly',
    background: 'music1_30s',
    goTo: 'sinbad-remember',
    extensions: {
        'i': 'sinbad-remember'
    }
}, {
    name: 'sinbad-speak-directly-music',
    background: 'music2_25s',
    goTo: 'sinbad-thank-you',
    extensions: {
        'i': 'sinbad-thank-you'
    }
}, {
    name: 'sinbad-remember',
    background: 'youmayremember',
    goTo: 'sinbad-speak-directly-music',
    extensions: {
        'i': 'sinbad-speak-directly-music'
    }
}, {
    name: 'sinbad-thank-you',
    background: 'thankyou',
    goTo: 'sinbad-voicemail-ring',
    extensions: {
        'i': 'sinbad-voicemail-ring'
    }
}, {
    name: 'sinbad-voicemail-ring',
    background: 'ring3',
    goTo: 'sinbad-voicemail-greet',
    extensions: {
        'i': 'sinbad-voicemail-greet'
    }
}, {
    name: 'sinbad-voicemail-greet',
    wait: 1,
    background: 'sinbad-voicemail',
    // background: [
        // david adkins
        // 'sinbad-greet',
        // is unavailable
        // 'vm-isunavail',
        // please leave message
        // 'vm-intro',
    // ],
    goTo: 'sinbad-voicemail',
    extensions: {
        'i': 'sinbad-voicemail'
    }
}, {
    name: 'sinbad-voicemail',
    record: 'recordings/voicemail/sinbad/${UNIQUEID}.wav,10,300,k',
}, {
    name: 'sinbad-money-music',
    background: 'music1_30s',
    goTo: 'sinbad-money-collecting',
    extensions: {
        'i': 'sinbad-money-collecting'
    }
}, {
    name: 'sinbad-money-collecting',
    background: 'collectingchecks',
    goTo: 'sinbad-path-to-brendan',
    extensions: {
        'i': 'sinbad-path-to-brendan'
    }
}, {
    name: 'sinbad-path-to-brendan',
    background: 'music2_25s',
    goTo: 'sinbad-website',
    extensions: {
        'i': 'sinbad-website'
    }
}, {
    name: 'sinbad-website',
    background: 'website',
    goTo: 'sinbad-website-ring',
    extensions: {
        'i': 'sinbad-website-ring'
    }
}, {
    name: 'sinbad-website-ring',
    background: 'ring3',
    goTo: 'sinbad-busy',
    extensions: {
        'i': 'sinbad-busy'
    }
}, {
    name: 'sinbad-busy',
    background: 'sinbadisbusy',
    goTo: 'sinbad-brendan-self-help-desk',
    extensions: {
        'i': 'sinbad-brendan-self-help-desk'
    }
}, {
    name: 'sinbad-brendan-self-help-desk',
    background: 'music2_25s',
    goTo: 'sinbad-tired-of-waiting',
    extensions: {
        'i': 'sinbad-tired-of-waiting'
    }
}, {
    name: 'sinbad-tired-of-waiting',
    background: 'tiredofwaiting',
    goTo: 'sinbad-voicemail-ring',
    extensions: {
        '*': 'sinbad-brendan-voicemail-ring',
        'i': 'sinbad-voicemail-ring',
    }
}, {
    name: 'sinbad-brendan-voicemail-ring',
    background: 'ring3',
    goTo: 'sinbad-brendan-voicemail-greet',
    extensions: {
        'i': 'sinbad-brendan-voicemail-greet',
    }
}, {
    name: 'sinbad-brendan-voicemail-greet',
    wait: 1,
    background: 'brendan-voicemail',
    goTo: 'sinbad-brendan-voicemail',
    extensions: {
        'i': 'sinbad-brendan-voicemail',
    }
}, {
    name: 'sinbad-brendan-voicemail',
    record: 'recordings/voicemail/brendan/${UNIQUEID}.wav,10,300,k',
}, {
    name: 'sinbad-beef-music',
    background: 'music2_25s',
    goTo: 'sinbad-call-doesnt-matter',
    extensions: {'i': 'sinbad-call-doesnt-matter'}
}, {
    name: 'sinbad-call-doesnt-matter',
    background: 'calldoesntmatter',
    goTo: 'sinbad-path-to-brendan',
    extensions: {'i': 'sinbad-path-to-brendan'}
}, {
    name: 'sinbad-great',
    background: 'survey',
    goTo: 'sinbad-call-is-important',
    extensions: {'i': 'sinbad-call-is-important'}
}, {
    name: 'sinbad-call-is-important',
    background: 'callisimportant',
    goTo: 'sinbad-great-music',
    extensions: {'i': 'sinbad-great-music'}
}, {
    name: 'sinbad-great-music',
    background: 'music2_25s',
    goTo: 'sinbad-thank-you',
    extensions: {'i': 'sinbad-thank-you'}
}, {
    name: 'sinbad-great-music',
    background: 'music2_25s',
    goTo: 'sinbad-thank-you',
    extensions: {'i': 'sinbad-thank-you'}
}, {
    name: 'sinbad-shazam',
    background: 'survey',
    goTo: 'sinbad-emergency',
    extensions: {'i': 'sinbad-emergency'}
}, {
    name: 'sinbad-emergency',
    background: 'emergency',
    goTo: 'sinbad-path-to-brendan',
    extensions: {'i': 'sinbad-path-to-brendan'}
}, {
    name: 'sinbad-memorabilia',
    background: 'survey',
    goTo: 'sinbad-blood-of-innocents',
    extensions: {'i': 'sinbad-blood-of-innocents'}
}, {
    name: 'sinbad-blood-of-innocents',
    background: 'bloodofinnocents',
    goTo: 'sinbad-goats-ring',
    extensions: {'i': 'sinbad-goats-ring'}
}, {
    name: 'sinbad-goats-ring',
    background: 'ring3',
    goTo: 'sinbad-goats-music',
    extensions: {'i': 'sinbad-goats-music'}
}, {
    name: 'sinbad-goats-music',
    background: 'music2_25s',
    goTo: 'sinbad-goats',
    extensions: {'i': 'sinbad-goats'}
}, {
    name: 'sinbad-goats',
    background: 'goats',
    wait: 3,
    goTo: 'sinbad-with-you-forever',
    extensions: {'i': 'sinbad-with-you-forever'}
}, {
    name: 'sinbad-with-you-forever',
    background: 'withyouforever',
    wait: 3,
    goTo: 'sinbad-brendan-self-help-desk',
    extensions: {'i': 'sinbad-brendan-self-help-desk'}
}, {
    name: 'sinbad-hire',
    background: 'survey',
    wait: 3,
    goTo: 'sinbad-hire-music',
    extensions: {'i': 'sinbad-hire-music'}
}, {
    name: 'sinbad-hire-music',
    background: 'music2_25s',
    wait: 3,
    goTo: 'sinbad-hire-message',
    extensions: {'i': 'sinbad-hire-message'}
}, {
    name: 'sinbad-hire-message',
    background: 'hiresinbad',
    wait: 3,
    goTo: 'sinbad-path-to-brendan',
    extensions: {'i': 'sinbad-path-to-brendan'}
}];

// module.exports = {flow};