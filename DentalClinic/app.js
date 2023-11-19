// Parse.initialize('WnILdLrE2IFpL6W1YJeeDEzNucE2zDoWmDKJeYpB', 'LRYb56nrG0ZvFflfHjS2Xt1FfDZwx9O8QtWoAeJR');
// Parse.serverURL = "https://parseapi.back4app.com/";
// // Verificar se o usuário está logado
// const currentUser = Parse.User.current();
// if (currentUser) {
//     showUserInfo(currentUser);
// } else {
//     showLoginSignup();
// }

// // Função para mostrar informações do usuário
// function showUserInfo(user) {
//     const loginContainer = document.getElementById("login-container");
//     const signupContainer = document.getElementById("signup-container");
//     const userInfo = document.getElementById("user-info");

//     if (loginContainer) loginContainer.style.display = "none";
//     if (signupContainer) signupContainer.style.display = "none";

//     if (userInfo) {
//         userInfo.style.display = "block";
//         document.getElementById("user-name").textContent = user.get("username");

//         // Botão de logout
//         const logoutButton = document.getElementById("logout-button");
//         if (logoutButton) {
//             logoutButton.addEventListener("click", () => {
//                 Parse.User.logOut();
//                 location.reload();
//             });
//         }
//     }
// }

// // Função para mostrar tela de login/cadastro
// function showLoginSignup() {
//     const loginContainer = document.getElementById("login-container");
//     const signupContainer = document.getElementById("signup-container");

//     if (loginContainer) loginContainer.style.display = "block";
//     if (signupContainer) signupContainer.style.display = "block";

//     // Botão de login
//     const loginButton = document.getElementById("login-button");
//     if (loginButton) {
//         loginButton.addEventListener("click", () => {
//             const username = document.getElementById("login-username").value;
//             const password = document.getElementById("login-password").value;

//             Parse.User.logIn(username, password).then((user) => {
//                 showUserInfo(user);
//             }).catch((error) => {
//                 alert("Login failed. Check your credentials.");
//             });
//         });
//     }

//     // Botão de cadastro
//     const signupButton = document.getElementById("signup-button");
//     if (signupButton) {
//         signupButton.addEventListener("click", () => {
//             const username = document.getElementById("signup-username").value;
//             const password = document.getElementById("signup-password").value;

//             const user = new Parse.User();
//             user.set("username", username);
//             user.set("password", password);

//             user.signUp().then((user) => {
//                 showUserInfo(user);
//             }).catch((error) => {
//                 alert("Sign up failed. Try a different username.");
//             });
//         });
//     }
// }
