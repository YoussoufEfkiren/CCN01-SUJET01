let TArticles = [];
let TArticlesChoisis = [];

function init() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'articles.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            TArticles = JSON.parse(xhr.responseText);
            remplirPizzaOptions();
        }
    };
    xhr.send();
}

window.onload = function() {
    init();
};

function remplirPizzaOptions() {
    const pizzaSelect = document.getElementById("pizza");
    pizzaSelect.innerHTML = "";
    TArticles.forEach(article => {
        const option = document.createElement("option");
        option.value = article.code;
        option.text = `${article.designation} - ${article.prixUnitaire}DH`;
        pizzaSelect.appendChild(option);
    });
}

function ajouter() {
    const nom = document.getElementById("nom").value;
    const adresse = document.getElementById("adresse").value;
    const pizzaSelect = document.getElementById("pizza");
    const quantite = parseInt(document.getElementById("quantite").value);

    if (!nom || !adresse) {
        alert("Les champs nom, adresse sont obligatoires.");
        return;
    }

    if (quantite < 1 || quantite > 10) {
        alert("La quantité doit être comprise entre 1 et 10.");
        return;
    }

    const articleChoisi = TArticles.find(article => article.code === pizzaSelect.value);

    TArticlesChoisis.push({
        designation: articleChoisi.designation,
        quantite: quantite,
        prixUnitaire: articleChoisi.prixUnitaire,
        prixTotal: articleChoisi.prixUnitaire * quantite
    });

    afficherArticlesChoisis();
}

function afficherArticlesChoisis() {
    const tableau = document.querySelector(".show table tbody");
    const totalElement = document.querySelector("input[type='text'][disabled]");
    let totalCommande = document.getElementById("totalCommande");

    let montantTotal = 0;

    tableau.innerHTML = ''; 
    TArticlesChoisis.forEach(article => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${article.designation}</td>
            <td>${article.quantite}</td>
            <td>${article.prixUnitaire}DH</td>
        `;
        tableau.appendChild(row);
        montantTotal += article.prixTotal;
    });

    var total = totalElement.value = montantTotal + "DH";
    total;

    totalCommande.innerHTML = "Montant Total : " + montantTotal + "DH";
}

function gererPaiement() {
    const isCheque = document.getElementById('cheque').checked;
    const numCarteInput = document.getElementById('numCarteBancaire');

    numCarteInput.disabled = isCheque; 
    numCarteInput.style.backgroundColor = isCheque ? 'rgb(37, 33, 33,0.4)' : 'white';
    numCarteInput.value = isCheque ? 'Disabled' : '';
}

function afficherPopup() {
    const detailsCommande = document.getElementById("detailsCommande");

    detailsCommande.innerHTML = `
        <table style="margin-Bottom: 20px;">
            <tr>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
            </tr>
            ${TArticlesChoisis.map(article => `
                <tr>
                    <td>${article.designation}</td>
                    <td>${article.quantite}</td>
                    <td>${article.prixUnitaire}DH</td>
                </tr>
            `).join('')}
            <tr>
                <td colspan="2">Total</td>
                <td style="font-weight: bold";color:red>${TArticlesChoisis.reduce((total, article) => total + article.prixTotal, 0)}DH</td>
            </tr>
        </table>
    `;

    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function fermerPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function imprimerCommande() {
    window.  print();
}