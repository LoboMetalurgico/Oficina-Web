function enviarDados(event) {
  event.preventDefault(); 

  const form = document.querySelector('form');
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData);

  fetch('/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(dados)
  })
  .then(response => response.text())
  .then(data => {
      document.getElementById('resultado').innerText = data;
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}
