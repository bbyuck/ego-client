import axios from 'axios';

const instance = axios.create({
  baseURL: "http://124.50.218.182:8080/test-server",
});

function sendAuthInfo(userData) {
  window.alert(JSON.stringify(userData));
  return instance.post('/getKakaoAuth', userData);
}

export { sendAuthInfo };