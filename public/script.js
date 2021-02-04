fetch("data/fields.json")
  .then(res => res.json())
  .then(data => {
    const name = data._embedded.request_fields[0].name
    const values = data._embedded.request_fields[0].values
    console.log(values)
    buildForm(name,values)
  })

function buildForm(name, options) {
  const container = document.querySelector("#container")
  const title = document.createElement("h3")
  title.textContent = name
  container.appendChild(title)
  const text = document.createElement("p")
  text.textContent = options
  container.appendChild(text)
}
