//const fs = require('file-system');
const axios = require('axios');
let interval;
// const assemblyURI = 'https://api.assemblyai.com/v2/transcript';

// const assemblyConfig = {
//     method: 'POST',
//     headers: {
//         authorization: '27b09bc6bf66424ea49dedaaf314b4ea',
//         'content-type': 'application/json',
//     },
//     data: {},
// };

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "27b09bc6bf66424ea49dedaaf314b4ea",
        "content-type": "application/json",
    },
});

function transcribe(res) {
    document.getElementById('text').innerHTML = res.data.text;
}

function waitForTranscript(id) {
    assembly.get(`/transcript/${id}`)
    .then((res) => {
        const status = res.data.status;
        console.log(`result status: ${status}`);
        if (status === 'completed') {
            transcribe(res);
            clearInterval(interval);
        } else if (status === 'error') {
            console.log(res);
            clearInterval(interval);
        } else {
            console.log('awaiting results...');
        }
    })
    .catch((err) => {
        console.log(err);
        clearInterval(interval);
    });
}

function getTranscript() {
    //const file = document.getElementById('file-path');

    // fs.readFile(file, (err, data) => {
    //     if (err) return console.error(err);
    //     else assemblyConfig.data.audio_url = data;
    // });

    assembly
    .post("/transcript", {
        audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => {
        console.log(res);
        console.log(res.data.id);
        interval = setInterval(() => waitForTranscript(res.data.id), 1000);
    })
    .catch((err) => console.error(err));

    // try {
    //     const response = await fetch(assemblyURI, assemblyConfig);
    //     if (response.ok) {
    //         const jsonResponse = await response.json();
    //         console.log(jsonResponse);
    //     } else {
    //         alert('Request failed.');
    //         console.log(response);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
}

document.getElementById('start').onclick = () => {
    getTranscript();
};