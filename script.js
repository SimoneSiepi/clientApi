const endpoint= 'https://jacopocorbani.alwaysdata.net/apisegnalistradali';
let segnali = [];
let categorie = [];

function getSegnali() {
    fetch(endpoint + '/segnali')
        .then(response => response.json())
        .then(data => {
            segnali = data;
            populateTable(segnali);
        })
        .catch(error => console.error(error));
}

function populateTable(segnali) {
    let table = document.getElementById('tabellaSegnali');
    table.innerHTML='';

    segnali.forEach(segnale => {
        let row = table.insertRow();
        let cell = row.insertCell();

        // Creazione del tag figure
        let figure = document.createElement('figure');

        // Creazione dell'immagine
        let img = document.createElement('img');
        img.src = segnale.percorso_immagine;
        img.alt = segnale.nome;
        img.classList.add('segnale-image');

        // Aggiunta dell'immagine al tag figure
        figure.appendChild(img);

        // Creazione del tag figcaption per il nome del segnale
        let figcaption = document.createElement('figcaption');
        figcaption.textContent = segnale.nome;

        // Aggiunta del figcaption sotto l'immagine nel tag figure
        figure.appendChild(figcaption);

        // Aggiunta del tag figure alla cella della tabella
        cell.appendChild(figure);

        // Inserimento della descrizione del segnale nella cella successiva
        cell = row.insertCell();
        cell.textContent = segnale.descrizione;
    });
}

function getCategorie() {
    fetch(endpoint + '/categorie')
        .then(response => response.json())
        .then(data => {
            categorie = data;
            generateButtons();
        })
        .catch(error => console.error(error));
}


function generateButtons() {
    let filtri = document.getElementById('filtro');
    categorie.forEach(categoria => {
        let btn = document.createElement('a');
        btn.classList.add('btn', 'btn-outline-primary');
        btn.textContent = categoria.nome; // assume che il nome della categoria sia fornito dal web service
        btn.dataset.id = categoria.nome; // imposta il nome della categoria come attributo del dataset
        btn.addEventListener('click', () => {
            filterByCategory(categoria.id); // quando il pulsante viene cliccato, filtra per la categoria corrispondente
        });
        filtri.appendChild(btn);
    });
}

function filterByCategory(categoriaID) {
    // implementa la logica per filtrare i dati del web service per la categoria specificata
    let segnaliFiltrati = segnali.filter(segnale => segnale.id_categoria=== categoriaID);
    console.log("Filtro per categoria con ID:", categoriaID);
    populateTable(segnaliFiltrati);
}

function startPage() {
    getSegnali();
    getCategorie();
}