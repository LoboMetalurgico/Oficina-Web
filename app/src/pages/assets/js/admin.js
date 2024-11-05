// Fazer requisição GET para o endpoint da API
function listUsers() {
  fetch('/api/listUsers')
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById('usuarios');
        if (data.length === 0) {
            usersList.innerHTML = '<li>Nenhum usuário encontrado.</li>';
            return;
        }
        data.forEach(user => {
            const li = document.createElement('li', { class: 'user', id: user.id });
            li.textContent = `${user.name} - ${user.email}`;
            usersList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar usuários:', error);
    });
}

// Fazer requisição POST para o endpoint de login do admin
function adminLogin(event) {
  event.preventDefault(); 
  fetch('/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.status === 200) {
        window.location.href = '/admin';
      } else {
        document.getElementById('resultado').innerText = 'Credenciais inválidas.';
        console.error('Credenciais inválidas.');
      }
    })
    .catch(error => {
      document.getElementById('resultado').innerText = 'Erro ao fazer login.';
      console.error('Erro ao fazer login:', error);
    });
}

// Sair do admin
function logout() {
  document.cookie = 'authId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/admin/login';
}
