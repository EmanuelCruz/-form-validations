/* const buttonSend = document.querySelector('.input--send') */
const mail = document.querySelector('#mail')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
const inputSend = document.querySelector('.input--send')
const inputRestart = document.querySelector('.input--restart')
const form = document.querySelector('.form')
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let stateInputs = [
    {id: "mail", state: false},
    {id: "asunto", state: false},
    {id: "mensaje", state: false}
]

mail.addEventListener('blur',validateInput)
asunto.addEventListener('blur',validateInput)
mensaje.addEventListener('blur',validateInput)
inputRestart.addEventListener('click',restartForm)
form.addEventListener('submit',sendMessage)

//FUNCIONES

//----------------------------InputEmail----------------------------
function validateInput(event) {
    toggleShowError(event)
    toggleStateInputSend()
    toggleStateInputRestart()
}

function toggleShowError(event) {
    if (event.target.type === "email") {
        let inputEmpty = event.target.value.trim().length === 0
        if (inputEmpty) {
            event.target.classList.add('error')
            showMessageError(event)
            updateArray(event,false)
        } else if (expresionRegular.test(event.target.value)) {
                event.target.classList.remove('error')
                hideMessageError(event)
                updateArray(event,true)
        } else {
                event.target.classList.add('error')
                showMessageError(event)
                updateArray(event,false)
        }     
    } else {
        let inputEmpty = event.target.value.trim().length === 0        
        if (inputEmpty) {
            event.target.classList.add('error')
            showMessageError(event)
            updateArray(event,false)
        } else {
            event.target.classList.remove('error')
            hideMessageError(event)
            updateArray(event,true)
        }
    }
}

function showMessageError(event) {
    const labels = event.target.labels
    const span = labels[0].children[0]
    const spanClassList = span.classList
    spanClassList.remove('disabled-span')
}

function hideMessageError(event) {
    const labels = event.target.labels
    const span = labels[0].children[0]
    const spanClassList = span.classList
    spanClassList.add('disabled-span')
}

function updateArray(event,state) {
    const labels = event.target.labels
    stateInputs.map(input => {
        if (input.id == labels[0].htmlFor) {
            input.state = state
        }
    })
}

//----------------------------------InputSend----------------------------------
function toggleStateInputSend() {
    let allInputsValid = stateInputs.every(input => input.state == true)
    if (allInputsValid) {
        enabledInputSend()
    } else {
        disabledInputSend()
    }
}

function enabledInputSend() {
    inputSend.classList.remove('disabled-input')
    inputSend.disabled = false
}

function disabledInputSend() {
    inputSend.classList.add('disabled-input')
    inputSend.disabled = true
}

//---------------------InputRestart-------------------
function toggleStateInputRestart() {
    let anyInputValid = stateInputs.some(input => input.state==true)
    if (anyInputValid) {
        enabledInputRestart()
    } else {
        disabledInputRestart()
    }
}

function disabledInputRestart() {
    inputRestart.classList.add('disabled-input')
    inputRestart.disabled = true
}

function enabledInputRestart() {
    inputRestart.classList.remove('disabled-input')
    inputRestart.disabled = false
}

//-------------------------PressRestart-------------------------
function restartForm() {
    restartInputs()
    deleteAlertMsg()
    disabledInputRestart()
    disabledInputSend()
    resetArray()
}

function restartInputs() {
    form.reset()
}

function deleteAlertMsg() {
    let spans = document.querySelectorAll('.form__error')
    spans.forEach(span => {
        let msgError = span.classList.contains('disabled-span')
        if (!msgError) {
            span.classList.add('disabled-span')
            let id = span.parentNode.htmlFor
            let input = document.querySelector(`#${id}`)
            input.classList.remove('error')
        }
    })
}

function resetArray() {
    stateInputs.forEach(input => input.state = false)
}

//-----------------------PressSendMessage-----------------------
function sendMessage(event) {
    event.preventDefault()
    console.log("validando")
    let allInputsValid = stateInputs.every(input => input.state == true)
    if (allInputsValid) {
        const loader = document.querySelector('.loader')
        loader.style.display = 'initial'
        disabledInputSend()
        disabledInputRestart()
        setTimeout(() => {
            loader.style.display = 'none'
            const paragraph = document.createElement('p')
            paragraph.className = 'confirmation-message'
            paragraph.textContent = "¡El mensaje se envió correctamente!"
            form.insertBefore(paragraph,loader)
            setTimeout(() => {
                paragraph.remove();
                restartInputs()
            }, 4000);
        }, 3000);
    }
}