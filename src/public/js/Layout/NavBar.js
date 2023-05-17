document.addEventListener("DOMContentLoaded", function (event) {
    const navListChildren = document.getElementById('nav_list').children
    for (let i = 0; i < navListChildren.length; i++) {
        if (navListChildren[i].pathname === window.location.pathname) {
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

    //TODO: que se guarde el estado en local storage de cuando la barra lateral esta abierta
    const isSideBarOpen = localStorage.getItem('isSideBarOpen')
    isSideBarOpen === 'true'? console.log('si') : console.log('no');;
    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
            if (toggle.classList.contains("bx-x")) localStorage.setItem('isSideBarOpen', false)
            else localStorage.setItem('isSideBarOpen', true)
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