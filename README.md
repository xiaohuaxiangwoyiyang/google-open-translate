# google-open-translate

A **free** and **unlimited** API for Google Translate :dollar::no_entry_sign:

## Features 

- Auto language detection
- Spelling correction
- Language correction 
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses

## Install 

```
npm install --save google-open-translate
```

## Usage

From automatic language detection to English:

``` js
const translate = require('google-open-translate');

translate('请问如何调用谷歌翻译API', {to: 'en'}).then(res => {
    console.log('res', res.text);
    //=> How to call Google Translate API
    // console.log(res.orig);
    //=> 请问如何调用谷歌翻译API
}).catch(err => {
    console.error(err);
});
```



## API

### translate(text, options)

#### text

Type: `string`

The text to be translated

#### options

Type: `object`

##### from

Type: `string` Default: `auto`

The `text` language. Must be `auto` or one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/matheuss/google-open-translate/languages.js)

##### to

Type: `string` Default: `en`

The language in which the text should be translated. Must be one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/matheuss/google-open-translate/master/languages.js).


### Returns an `object`:

- `text` *(string)* – The translated text.
- `orig` *(string)* - The origial text.
- `src` *(array)* - What language needs to be translated into another language.
