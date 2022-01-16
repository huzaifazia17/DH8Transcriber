const axios = require('axios');
const converter = require('./format-converter');

const assembly = axios.create({
    baseURL: 'https://api.assemblyai.com/v2',
    headers: {
        authorization: '27b09bc6bf66424ea49dedaaf314b4ea',
        'content-type': 'application/json',
    },
});

let loading = false;

module.exports.isLoading = function () { return loading; };

function divideContent(data) {
    return new Promise((resolve, reject) => {
        assembly
        .get(`/transcript/${data.id}/paragraphs`)
        .then((res) => {
            resolve({
                pars: res.data.paragraphs,
                chaps: data.chapters,
            });
        })
        .catch((err) => reject(err));
    });
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

module.exports.transcribe = async function(url) {
    loading = true;
    try {
        const response = await assembly.post('/transcript', { audio_url: url, auto_chapters: true, });
        const rawTranscript = await getTranscript(response.data.id);
        const { pars, chaps } = await divideContent(rawTranscript);
        converter.convert(pars, chaps);
        loading = false;
    } catch (err) {
        console.error(err);
        loading = false;
    }
}