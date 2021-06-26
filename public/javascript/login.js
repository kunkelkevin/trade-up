const loginId = document.querySelector('#email-login')
const passwordLogin = document.querySelector('#password-login')

async function login() {
    const response = await fetch('/api/users/login', {
      body: { username: loginId, password: passwordLogin },
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#login').addEventListener('click', login);