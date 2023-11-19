// Evento de clique no botão "Cadastrar"
async function Cadastrar(event) {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const telefone = document.getElementById('telefone').value;
  const funcao = document.getElementById('inputGroupSelect02').value;

  // Crie um novo usuário no Parse
  const user = new Parse.User();
  user.set('username', username);
  user.set('password', password);
  user.set('email', email);
  user.set('telefone', telefone);
  user.set('funcao', funcao);

  user.signUp().then(function(user) {
      // Registro bem-sucedido, você pode redirecionar para a página de login ou fazer outra ação
      alert('Registro realizado com sucesso!');
      window.location.href = 'login.html'; // Redirecionar para a página de login
  }).catch(function(error) {
      // Ocorreu um erro durante o registro
      alert('Erro no registro: ' + error.message);
  });
};

if (document.getElementById('register_button')) {
  document.getElementById('register_button').addEventListener('click', function(event) {
    event.preventDefault();
    Cadastrar();
  });
}



// evento = document.getElementById("login_button").addEventListener("click", Login);
  async function Login(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)
    // Botão de login
    const loginButton = document.getElementById("login_button");

    if (loginButton) {
        try {
            let usr = document.getElementById("username").value;
            let passw = document.getElementById("password").value;
            let user = await Parse.User.logIn(usr, passw);

            // Verifica se o login foi bem-sucedido
            if (user) {
                // Armazena informações da sessão (pode usar o Local Storage)
                localStorage.setItem("userId", user.id);
                localStorage.setItem("username", user.get("username"));
                const username = user.get('username'); // Certifique-se de usar o campo correto
                const funcao = user.get('funcao')
                if(funcao == 1){
                  alert('Bem-vindo, ' + username + '!');
                  window.location.href = './../views/user.html';
                }
                else{
                  alert('Bem-vindo, ' + username + '!');
                  window.location.href = './../views/dash.html';
                }
            } else {
                alert('Erro ao logar o usuário');
            }
        } catch (error) {
          alert('Erro ao logar o usuário');
        }
    }
    
    // Adicione um event listener ao formulário para chamar a função Login()
    document.getElementById("login_form").addEventListener("submit", Login);
}


