 import axios from "./axios";

axios.get('/order')
  .then(response => {
    // handle success
    console.log(response.data);
  })
  .catch(error => {
    // handle error
    console.error(error);
  });