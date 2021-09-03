// https://www.robinwieruch.de/react-hooks-fetch-data
// https://reactjs.org/docs/faq-ajax.html
// https://github.com/axios/axios

const axios = require("axios");

const getLabsData = function () {
  return axios({
    method: "get",
    url: `/labs.json`,
  });
};

export default getLabsData;
