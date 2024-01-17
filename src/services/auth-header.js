export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('token'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}