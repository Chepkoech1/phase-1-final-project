const login = document.querySelector('#main-holder')
const btn = document.querySelector('.submit')
const form = document.querySelector('form')

form.addEventListener('submit',(e) =>{
    e.preventDefault()
})
btn.addEventListener('click',(e) =>{
    const formData = new FormData(form)
    for (const value of formData.values()) {
        console.log(value);
      }
      login.style.display = 'none'
      document.querySelector('.content').style.display = 'block'
})