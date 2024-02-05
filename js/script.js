const API_URL = "https://restcountries.com/v3.1/all"
const kokEleman = document.querySelector("#root")
const ulkeler = []

async function veriCek() {
    const yanit = await fetch(API_URL)
    const veri = await yanit.json() // veri obje veya array olacaktır

    ulkeler.push(...veri)

    renderLayout()
}

function renderLayout() {   
    const HTMLSablon = `
        <div class="ulkeler-header">
            <h1>Ülkeler</h1>
            <input type="text" placeholder="Arama ifadesi girin..">
        </div>
    `
    kokEleman.insertAdjacentHTML( "beforeend", HTMLSablon)

    const kartKapsayici = document.createElement("div")
    kartKapsayici.classList.add("kart-kapsayici")
    kokEleman.append(kartKapsayici)

    renderUlkeler(kartKapsayici, ulkeler)
    eventKaydet()
}

function renderUlkeler(kartKapsayici, ulkeArray) {
    kartKapsayici.innerHTML = ""

    ulkeArray.forEach(ulkeObjesi=>{
        const ulkeDiv = document.createElement("div")
        ulkeDiv.classList.add("ulke-kart")

        const ulkeGorsel = document.createElement("img")
        ulkeGorsel.src = ulkeObjesi.flags.svg
        ulkeDiv.append(ulkeGorsel)

        kartKapsayici.append(ulkeDiv)
    })
}


function eventKaydet() {
    const inputEleman = document.querySelector(".ulkeler-header input")
    inputEleman.addEventListener("keyup", olay=>{
        const filtrelenmisUlkeler = ulkeler.filter(ulkeObjesi=>{
            let aranan = inputEleman.value.toLowerCase()
            let commonName = ulkeObjesi.name.common.toLowerCase()
            let officialName = ulkeObjesi.name.official.toLowerCase()

            return officialName.includes(aranan) || commonName.includes(aranan)
        })

        const kartKapsayici = document.querySelector(".kart-kapsayici")
        renderUlkeler(kartKapsayici, filtrelenmisUlkeler)
    })
}

veriCek()