import store from '@/store/store';
import dictionary from "@/data/dictionary";

const translate = function(word, n = 1) {
    let language, isoCode;
    language = store.state.languages.current;
    isoCode = language ? language.iso_code : 'en';
    word = n === 1 ? word : word + 'Plural';
    if (dictionary[word] && dictionary[word][isoCode]) {
        return dictionary[word][isoCode];
    } else {
        return 'Could not translate ' + word;
    }
};



export default {
    translate
};