fetch("data/fields.json")
  .then((res) => res.json())
  .then((data) => {
    const fields = data._embedded
    buildForm(fields)
  })

function buildForm(fields) {
  let step = 0
  const choicesMade = {}
  const formContent = selectForm(step, fields)
  const html = writeHTML(step, formContent)
  const form = document.querySelector("#form")
  form.innerHTML = html
}

function writeHTML(step, content) {
  return `
      <label for=${content.name}>${content.label}</label>
      <select placeholder="${content.placeholder}">
        ${listOptions(content.values)}
      </select>
      <span hidden id="warning">Este campo é requerido</span>
      ${renderButtons(step, content)}
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

function selectForm(step, fields) {
  if (step < 5) {
    return fields.request_fields[step]
  } else {
    return fields.user_fields
  }
}

function renderButtons(step, content) {
  const nextText = step == 5 ? "Finalizar" : "Próximo"
  return `
  <div class="buttons">
    <button ${step == 0 ? "hidden" : ""} id="back">Voltar</button>
    <button id="next">${content.required ? nextText : "Pular"} </button>
  </div>
  `
}
