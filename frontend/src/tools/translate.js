import store from "@/store/store";
import dictionary from "@/data/dictionary";

const translate = function (word, capitalize = false) {
    let language, isoCode, translation;
    language = store.state.languages.current;
    isoCode = language ? language.iso_code : "en";
    if (dictionary[word] && dictionary[word][isoCode]) {
        translation = dictionary[word][isoCode];
        return capitalize ? translation : translation.toLowerCase();
    } else {
        return "Could not translate " + word;
    }
};

export default {
    translate,
};
