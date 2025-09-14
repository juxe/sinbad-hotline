// if (!navigator.getUserMedia)
//     navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// It returns a Promise that resolves to a MediaStream object. If the user denies permission, or matching media is not available, then the promise is rejected with NotAllowedError or NotFoundError DOMException respectively.
async function startRecording () {
    console.log('start recording');
    try {
        function gotStream (stream) {
            console.log('got stream', stream);
        }
        function err (e) {
            console.log('error getting stream:', e);
        }
        const constraints =  {
            audio: {
                mandatory: {
                    googEchoCancellation: false,
                    googAutoGainControl: false,
                    googNoiseSuppression: false,
                    googHighpassFilter: false
                }
            },
            optional: []
        };
        // const recorder = await navigator.getUserMedia(constraints, gotStream, err);
        // console.log('got navigator media:', recorder)
    } catch (e) {
        // if (e instanceof NotAllowedError) {
        //     // user denied mic
        //     console.log('user did not allow mic access');
        // } else if (e instanceof NotFoundError) {
        //     console.log('no mic found');
        // } else {
        //     console.log('some other error:', e);
        // }
        console.log('some other error:', e);
    }
}

function stopRecording () {
    console.log('stop recording');
}