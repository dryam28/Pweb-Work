document.addEventListener("DOMContentLoaded", function (event) {
    const navListChildren = document.getElementById('nav_list').children
    for (let i = 0; i < navListChildren.length; i++) {
        if(navListChildren[i].pathname === window.location.pathname){
            navListChildren[i].classList.add('active')
        }
        
    }
    // active
    const toggle = document.getElementById('header-toggle'),
        nav = document.getElementById('nav-bar'),
        bodypd = document.getElementById('body-pd'),
        headerpd = document.getElementById('header'),
        closeDrawerButton = document.getElementById('closeDrawerButton')

        closeDrawerButton.addEventListener('click', () => { toggle.click() })
    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
            toggle.style
            // show navbar
            nav.classList.toggle('show-bar')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }

});