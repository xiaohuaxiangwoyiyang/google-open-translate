
var querystring = require('querystring');

var got = require('got');

var languages = require('./languages');

function translate(text, opts) {
    opts = opts || {};

    var e;
    [opts.from, opts.to].forEach(function (lang) {
        if (lang && !languages.isSupported(lang)) {
            e = new Error();
            e.code = 400;
            e.message = 'The language \'' + lang + '\' is not supported';
        }
    });
    if (e) {
        return new Promise(function (resolve, reject) {
            reject(e);
        });
    }

    opts.from = opts.from || 'auto';
    opts.to = opts.to || 'en';

    opts.from = languages.getCode(opts.from);
    opts.to = languages.getCode(opts.to);
  
        let url = 'http://translate.google.cn/translate_a/single';
        const data = {
            client: 'gtx',
            dt: 't',
            dj: 1,
            ie: 'UTF-8',
            sl: opts.from,
            tl: opts.to,
            q: text,
        };
        url = `${url}?${querystring.stringify(data)}`;
        return got(url).then(function (res) {
            const body = JSON.parse(res.body);
            const result = {
                text: '',
                lang: [],
                orig: '',
            }
            if (body.sentences && body.sentences[0]) {
                result.text = body.sentences[0].trans;
                result.orig = body.sentences[0].orig;
            }
            if (body.src) {
                result.lang = body.src.split('-');
            }
            console.log('body', result);
            return result;
        }).catch(function (err) {
            console.log('err', err);
            var e;
            e = new Error();
            if (err.statusCode !== undefined && err.statusCode !== 200) {
                e.code = 'BAD_REQUEST';
            } else {
                e.code = 'BAD_NETWORK';
            }
            throw e;
        });
}

module.exports = translate;
module.exports.languages = languages;
