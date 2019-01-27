import { CampK12 } from 'src/types';
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const API_KEY = 'trnsl.1.1.20190127T135355Z.4d28f67c263381f6.27ceb4dd6d10bfc22fb63569b0f45eb7fb754b55'

const CampK12: CampK12 = {
  translate: (inputText: string, fromLang: string, toLang: string) => {
    return new Promise((resolve, reject) => {
      let lang = `${fromLang.substr(0, 2).toLowerCase()}-${toLang.substr(0, 2).toLowerCase()}`; 
      let url = `${API_URL}?key=${API_KEY}`;
      url += '&text=' + encodeURI(inputText);
      url += `&lang=${lang}`;
  
      fetch(url, { method: 'GET' })
      .then(res => res.json())
      .then((response) => {
        console.log("response: ", response);
        if (response.code === 200) {
          resolve(response.text[0]);
        } else {
          resolve(`Something Went Wrong. Try something else !!`);
        }
      })
      .catch(error => {
        console.log("There was an error with the translation request: ", error);
        resolve(`Something Went Wrong. Try something else !!`);
      });
    })
  }
}

export default CampK12;