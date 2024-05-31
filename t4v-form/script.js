let quantity = 1
let api = "https://ontodeside.ida.liu.se"

let data_shapes_url = `${api}/api/owl2shacl?url=http%3A%2F%2Fw3id.org%2FCEON%2Fontology%2Fflatglass%2F`
//data_shapes_url = "test.ttl"
let data_shape_subject = "http://owl2shacl.liu.se/WindowShape"

let form = document.getElementById("shacl-form")
form.setAttribute('data-shape-subject', data_shape_subject)
form.setAttribute('data-shapes-url', data_shapes_url)


// Select the form element directly
const el = document.getElementById('shacl-form');
el.addEventListener('submit', (e) => {
    e.preventDefault()
    submit()
});

function setLanguage() {
    let lang = document.getElementById("lang").value
    let el = document.getElementById("shacl-form")
    let data = el.serialize("ttl")

    let nodeId = document.getElementById("shacl-form").shape.nodeId
    el.setAttribute("data-language", lang)
    el.setAttribute("data-values", data)
    el.setAttribute("data-value-subject", nodeId.id)
}

function setQuantity() {
    let value = document.getElementById("quantity").value;
    if (typeof value === 'number') {
        quantity = value;
    }
}

function preventNonNumericInput(element) {
    element.value = element.value.replace(/[^0-9]/g, '');
}

function getTypes() {
    let bnode_target = document.getElementById("shacl-form").shape.nodeId.id
    let data = el.serialize('TTL')

    let target = `http://example.org/${bnode_target.split(":")[1]}`
    data = data.replaceAll(bnode_target, `<${target}>`)
    let schema = data_shapes_url


    let message = {
        target,
        data,
        schema
    }
    let url = `${api}/api/types`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => response.json())
        .then(types => {
            console.log(types)
            types.sort()
            types.reverse();
            let ul = document.querySelector('#types ul')
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for (let type of types) {
                let li = document.createElement('li')
                arr = type.split("/")
                li.textContent = arr[arr.length - 1]
                ul.appendChild(li)
            }
            updateSticker(types)
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error)
        });
}

function updateSticker(types) {
    let ns = 'http://w3id.org/CEON/ontology/construction/window/'
    let src = 'img/unknown.png'
    for (let type of types) {
        switch (type[1]) {
            case ns + 'NonRecyclableWindow':
                src = 'img/non-recyclable.png'
                break
            case ns + 'RecyclableWindow':
                src = 'img/recyclable.png'
                break
            case ns + 'RecyclableWindowWAsbestos':
                src = 'img/warning.png'
                break
        }
    }
    let img = document.querySelector('#sticker img')
    img.setAttribute('src', src)
}

function submit() {
    // Post data
    let el = document.getElementById("shacl-form")
    let data = el.serialize('TTL')
    alert(data)
}