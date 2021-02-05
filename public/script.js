fetch("data/fields.json")
  .then((res) => (res ? res.json() : console.log("No JSON found.")))
  .then((data) => {
    const fields = data._embedded
    sessionStorage.setItem("step", "0")
    buildForm(fields)
  })

function buildForm(fields) {
  const formContent = selectForm(fields)
  const html = writeHTML(formContent)
  const form = document.querySelector("#form")
  form.innerHTML = html
  configButtons(fields)
}

function writeHTML(content) {
  // This method will draw the form according to the content of the json file
  const htmlTag = { enumerable: "select", big_text: "textarea" }
  const field = { enumerable: listOptions(content.values), big_text: "" }

  return `
      <label for='${content.name}'>${content.label}</label>
      <${htmlTag[content.type]} class="user-input" placeholder="${
    content.placeholder
  }">${field[content.type]}</${htmlTag[content.type]}>
      <span hidden id="warning">Este campo é requerido</span>
      ${renderButtons(content)}
    `
}

function listOptions(values) {
  const valuesArray = Object.keys(values)
  let optionsHTML = `
    <option value='' disabled selected>Selecione uma opção</option>
    `
  valuesArray.forEach((value) => {
    optionsHTML += `
        <option value=${value}>${value}</option>
      `
  })
  return optionsHTML
}

function selectForm(fields) {
  const step = sessionStorage.getItem("step")
  if (step < 5) {
    return fields.request_fields[step]
  } else {
    return fields.user_fields
  }
}

function configButtons(fields) {
  const step = sessionStorage.getItem("step")
  const nextBtn = document.getElementById("next")
  const backBtn = document.getElementById("back")

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputValue = document.querySelector(".user-input").value
    if (inputValue.length == 0) {
      activateWarning()
    } else {
      sessionStorage.setItem(step, inputValue)
      increaseStep()
      buildForm(fields)
    }
    console.log(inputValue)
  })

  backBtn.addEventListener("click", (e) => {
    e.preventDefault()
    decreaseStep()
    buildForm(fields)
  })
}

function increaseStep() {
  let step = sessionStorage.getItem("step")
  step = (parseInt(step) + 1).toString()
  sessionStorage.setItem("step", step)
}

function decreaseStep() {
  let step = sessionStorage.getItem("step")
  step = (parseInt(step) - 1).toString()
  sessionStorage.setItem("step", step)
}

function activateWarning() {
  const warning = document.getElementById("warning")
  warning.removeAttribute("hidden")
}

function renderButtons(content) {
  const step = sessionStorage.getItem("step")
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
