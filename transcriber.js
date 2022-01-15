const axios = require('axios');
const converter = require('./format-converter');

const assembly = axios.create({
    baseURL: 'https://api.assemblyai.com/v2',
    headers: {
        authorization: '27b09bc6bf66424ea49dedaaf314b4ea',
        'content-type': 'application/json',
    },
});

function divideContent(data) {
    let paragraphs;
    let chapters = data.chapters;

    assembly
    .get(`/transcript/${data.id}/paragraphs`)
    .then((res) => {
        paragraphs = res.data.paragraphs;
        return { pars: paragraphs, chaps: chapters };
    })
    .catch((err) => console.error(err));
}

function getTranscript(id) {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            assembly.get(`/transcript/${id}`)
            .then((res) => {
                const status = res.data.status;
                console.log(`transcript status: ${status}`);
                if (status === 'completed') {
                    clearInterval(interval);
                    resolve(res.data);
                } else if (status === 'error') {
                    clearInterval(interval);
                    reject(res);
                } else {
                    console.log('awaiting transcript...');
                }
            })
            .catch((err) => {
                clearInterval(interval);
                reject(err);
            });
        }, 1000);
    });
}

module.exports.transcribe = function(url) {
    assembly
    .post('/transcript', {
        audio_url: url,
        auto_chapters: true,
    })
    .then((res) => {
        console.log(res);
        console.log(res.data.id);
        getTranscript(res.data.id)
        .then((res) => {
            const { pars, chaps } = divideContent(res);
            converter.convert(pars, chaps);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}