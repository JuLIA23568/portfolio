/**
 * Created by Юлия on 26.07.2018.
 */
//select DOM items

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');


const navItems = document.querySelectorAll('.nav-item');


//set initial state of menu
let showMenu = false;


 menuBtn.addEventListener('click', toggleMenu);
 function toggleMenu() {

     if (!showMenu){
         menuBtn.classList.add('close');
         menu.classList.add('show');
         menuNav.classList.add('show');
         menuBranding.classList.add('show');
         navItems.forEach(item => item.classList.add('show'));
         showMenu = true;

     }else {
         menuBtn.classList.remove('close');
         menu.classList.remove('show');
         menuNav.classList.remove('show');
         menuBranding.classList.remove('show');
         navItems.forEach(item => item.classList.remove('show'));
         showMenu = false;
     }

 }



//make sure that WS are supported

if('serviceWorker' in navigator){
     window.addEventListener('load',()=>{
         navigator.serviceWorker
             .register('../sw_cached_site.js')
             .then(reg => console.log('SW: registered'))
             .catch(err => console.log(`Service Worker: Error: ${err}`))
     })
}

