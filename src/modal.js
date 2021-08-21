let modal = null

export function openModal(e) {
    /**
     * function who activate and initializes the modal window
     */
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

function closeModal(e) {
    /**
     * function who closed the modal window
     */
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

function stopPropagation(e) {
    /**
     * Prevents closing the modal window if you click in it
     */
    e.stopPropagation()
}

window.addEventListener('keydown', function (e) {
    /**
     * close the modal window if press on ESC of the keyboard
     */
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }

})