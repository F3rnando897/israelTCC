let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
let header = document.querySelector('.header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    if (window.scrollY > 0){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }    
}

//dark theme
let icon = document.getElementById('icon');
icon.onclick = function(){
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        icon.src = "./public/images/darktheme/sun.png";
    }else{
        icon.src = "./public/images/darktheme/moon.png";
    }
}