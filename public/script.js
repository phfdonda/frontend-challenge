fetch("data/fields.json")
  .then((res) => res.json())
  .then((data) => {
    const fields = data._embedded
    console.log(fields)
    buildForm(fields)
  })

  function buildForm(fields) {
    let step = 0
    const choicesMade = {}
    const formContent = selectForm(step,fields)
    const html = writeHTML(formContent)
    console.log(formContent)
    const form = document.querySelector("#form")
    form.innerHTML = html
  }

  function writeHTML(content){
    return(
    `
      <label for=${content.name}>${content.label}</label>
      <select>
        ${listOptions(content.values)}
      </select>
    `
    )
  }

  function listOptions(values){
    const valuesArray = Object.keys(values)
    let optionsHTML = ''
    valuesArray.forEach(value => {
      optionsHTML +=
      `
        <option value=${value}>${value}</option>
      `
    })
    return optionsHTML
  }

  function selectForm(step, fields){
    if(step < 5){
      return fields.request_fields[step]
    }else{
      return fields.user_fields
    }
  }

  // const optionsArray = Object.keys(values)

  // const form = document.querySelector("#form")
  // optionsArray.forEach((option) => {
  //   const item = document.createElement('li')
  //   const text = document.createElement('p')
  //   const arrow = document.createElement('div')

  //   item.classList.add('form-item')
  //   arrow.classList.add('arrow')
  //   text.textContent = values[option]

  //   item.appendChild(text)
  //   item.appendChild(arrow)
  //   form.appendChild(item)
  // })
  // console.log(form)
