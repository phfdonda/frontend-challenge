fetch("data/fields.json")
  .then((res) => (res ? res.json() : console.log("No JSON found.")))
  .then((data) => {
    const fields = data._embedded
    sessionStorage.setItem("step", "0")
    buildForm(fields)
  })

function buildForm(fields) {
  const step = getStep()
  const formContent = selectForm(fields)
  const html = writeHTML(formContent)
  const form = document.querySelector("#form")
  form.innerHTML = html
  step < 6 ? configButtons(fields) : false
  renderProgressBar()
}

function writeHTML(content) {
  // This method will draw the form according to the content of the json file
  const step = getStep()
  const selectForm = step == 5 ? "user_fields" : "request_fields"
  const formHTML = {
    request_fields: {
      img: "",
      title: "Explique o que você precisa",
      small: "Receba até 4 orçamentos grátis, online!",
      inputs: requestInputs(content)
    },
    user_fields: {
      img: "<img class='form__icon' src='https://tanya-assets.getninjas.com.br/static/images/svg/fast-clock.svg' alt='Relógio'></img>",
      title: "Estamos quase lá!",
      small:
        "<small>Não perca tempo ligando para vários profissionais. Preencha os dados abaixo e <strong>nós encontraremos os melhores pra você!</strong></small>",
        inputs: userInputs(content)
    },
  }
  const thanks = "<h2>Obrigado!</h2><h3>Nós recebemos sua consulta e entraremos em contato em breve com orçamentos dos melhores profissionais do mercado!</h3>"

  const form = formHTML[selectForm]
  const html =
  `
    <div class='form__info'>
      ${form.img}
      <h2>${form.title}</h3>
      <h3>${form.small}</h3>
    </div>
    ${form.inputs}
    ${renderButtons(content)}
    `

  return (step == 6 ? thanks : html)
}

function thankYou(){
  return

}

function requestInputs(content){
  const htmlTag = { enumerable: "select", big_text: "textarea" }
  return `<label for='${content.name}'>${content.label}</label>
      <${htmlTag[content.type]}
        class="user-input"
        placeholder="${content.placeholder}"
      >${content.type == "enumerable" ? listOptions(content.values) : ""}</${
        htmlTag[content.type]}>
        <span hidden class="warning">Este campo é requerido</span>`
}

function userInputs(content){
  const fieldsArray = Object.keys(content)
  let fieldsHTML = ''

  fieldsArray.forEach((index) => {
    const field = content[index]
    fieldsHTML +=
    `
    <div id='${field.name}__field' class="input__field">
      <label for='user__${field.name}'>${field.label}</label>
      <input
        class="user-input"
        id='user__${field.name}'
        placeholder='${field.placeholder}'
        ${field.required ? 'required' : ''}
        type='${field.type}'
        value=''
        oninvalid="alert(nope)">
      ${field.required ? '<span hidden class="warning">Este campo é requerido</span>' : ''}
    </div>
    `
  })
  return fieldsHTML
}

function listOptions(values) {
  const valuesArray = Object.keys(values)
  let optionsHTML = `
    <option value='' disabled selected>Selecione uma opção</option>
    `
  valuesArray.forEach((value) => {
    optionsHTML += `
        <option value='${value}'>${value}</option>
      `
  })
  return optionsHTML
}

function getStep(){
  return sessionStorage.getItem("step")
}

function selectForm(fields) {
  const step = getStep()
  if (step < 5) {
    return fields.request_fields[step]
  } else {
    return fields.user_fields
  }
}

function configButtons(fields) {
  const step = getStep()
  const nextBtn = document.getElementById("next")
  const backBtn = document.getElementById("back")

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputValue = document.querySelector(".user-input").value
    if (inputValue.length == 0 && ['Próximo', 'Finalizar'].includes(nextBtn.textContent)) {
      activateWarning()
    } else {
      sessionStorage.setItem(step, inputValue)
      increaseStep()
      buildForm(fields)
    }
  })

  backBtn.addEventListener("click", (e) => {
    e.preventDefault()
    decreaseStep()
    buildForm(fields)
  })
}

function increaseStep() {
  let step = getStep()
  step = (parseInt(step) + 1).toString()
  sessionStorage.setItem("step", step)
}

function decreaseStep() {
  let step = getStep()
  step = (parseInt(step) - 1).toString()
  sessionStorage.setItem("step", step)
}

function renderProgressBar(){
  const bar = document.getElementById('progress-bar__fill')
  bar.column-end = getStep() + 1
}

function activateWarning() {
  const warnings = document.querySelectorAll(".warning")
  console.log(warnings)
  const inputs = document.querySelectorAll(".user-input")
  warnings.forEach(warning=>{
    warning.removeAttribute("hidden")
  })
  inputs.forEach(input => {
    input.classList.add("warned")
  })
}

function renderButtons(content) {
  const step = getStep()
  const moment = step == 5 ? "final" : "progress"
  const nextTextMap = {
    final: {
      undefined: "Finalizar",
    },
    progress: {
      true: "Próximo",
      false: "Pular",
    },
  }
  const nextText = nextTextMap[moment][content.required]

  return `
  <div class="buttons">
    <button id="back" ${step == 0 ? "hidden" : ""} >Voltar</button>
    <button id="next">${nextText}</button>
  </div>
  `
}
