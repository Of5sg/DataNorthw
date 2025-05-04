
document.addEventListener("DOMContentLoaded", () => {

    // velge navigerings-stripen, og få den til å scrolle sidelengs, når pekeren er over den
    const navHeader = document.querySelector(".nav-header");

    navHeader.addEventListener("wheel", function (event) {
        
        if(event.deltaY !== 0) {
            event.preventDefault();
            navHeader.scrollLeft += event.deltaY;
        };

    });

    const dropdownButton = document.getElementsByClassName("dropdown-button");
    const filterMeny = document.getElementById("filterfelt");

});

// grunn-urlen til siden, for bruk i tabell-fetch og iframe
const urlBase = window.location.origin;
let currentQuery = "";

// endre hvilken data som vises i iframe
// function changeIframe(url){
//     const iframe = document.getElementById("iframe");
//     iframe.src = urlBase + url;
// };

function createTable(data){

    const tabell = document.getElementById("Tabell");

    //slette alt i tabellen
    tabell.innerHTML = "";

    //bruke keys som kolonner
    const columnNames = Object.keys(data[0]);

    // tr = table row
    const headerRow = document.createElement("tr");

    columnNames.forEach(column => {

        // th = table header
        const tabellHeader = document.createElement("th");

        tabellHeader.innerText = column;
        headerRow.appendChild(tabellHeader);

    });

    tabell.appendChild(headerRow);

    // lage rader av dataen
    data.forEach(item => {

        const rad = document.createElement("tr");
        
        columnNames.forEach(column => {

            // td = table data
            const tabellData = document.createElement("td")

            tabellData.innerText = item[column] || "";
            rad.appendChild(tabellData);

        });

        tabell.appendChild(rad);

    });
    
}

async function fetchFilteredData() {

    const tabell = document.getElementById("Tabell");

    //sjekke at elementene eksisterer, og hvis ikke, sette variablene til tomme strenger
    const yearElement = document.getElementById("yearFilt");
    const yearFilter = yearElement ? yearElement.value : null;

    const monthElement = document.getElementById("monthFilt");
    const monthFilter = monthElement ? monthElement.value : null;

    const firstNameElement = document.getElementById("firstNameFilt");
    const firstNameFilter = firstNameElement ? firstNameElement.value : null;

    const lastNameElement = document.getElementById("lastNameFilt");
    const lastNameFilter = lastNameElement ? lastNameElement.value : null;

    const iDElement = document.getElementById("idFilt");
    const iDFilter = iDElement ? iDElement.value : null;

    const companyElement = document.getElementById("companyFilt");
    const companyFilter = companyElement ? companyElement.value : null;

    const titleElement = document.getElementById("titleFilt");
    const titleFilter = titleElement ? titleElement.value : null;

    const productElement = document.getElementById("productFilt");
    const productFilter = productElement ? productElement.value : null;


    const queryParams = new URLSearchParams();

    // legge til parameterene, hvis elementet eksisterer på siden.
    if (yearFilter !== null) queryParams.append("year", yearFilter);
    if (monthFilter !== null) queryParams.append("month", monthFilter);
    if (firstNameFilter !== null) queryParams.append("firstname", firstNameFilter);
    if (lastNameFilter !== null) queryParams.append("lastname", lastNameFilter);
    if (iDFilter !== null) queryParams.append("id", iDFilter);
    if (companyFilter !== null) queryParams.append("company", companyFilter);
    if (titleFilter !== null) queryParams.append("title", titleFilter);
    if (productFilter !== null) queryParams.append("product", productFilter);


    //slette alt i tabellen
    tabell.innerHTML = "";

    const fullUrl = `${urlBase}${currentQuery}?${queryParams.toString()}`;

    console.log(fullUrl);

    try{

        //hente data
        const response = await fetch(fullUrl, {
            "method": "GET",
        });
        
        if (!response.ok) {
            throw new Error("server error: " + response.status);
        };

        const data = await response.json();

        createTable(data);


    }catch (error){

        console.error("Error fetching data:", error);

    }; 
};

// endre hvilken data tabellen viser
async function fetchData(url){

    try{

        //hente data
        const response = await fetch(urlBase + url, {
            "method": "GET",
        });
        
        if (!response.ok) {
            throw new Error("server error: " + response.status);
        };

        const data = await response.json();

        createTable(data);

    }catch (error){

        console.error("Error fetching data:", error);

    };

};

// endre begge ved klikk
async function Klikk(url, desc){

    // sette globalt variabel, til nåværende side
    currentQuery = url;

    // tømme søkefeltet, hver gang  man bytter innholdet i tabellen
    const param = document.getElementById("filterParam");
    param.value = "";

    const filterArea = document.getElementById("filterArea");
    filterArea.innerHTML = "";

    // tømme beskrivelsen
    const beskrivelse = document.getElementById("beskrivelse");
    beskrivelse.innerHTML = "";

    // lage <p> for beskrivelsen
    const besk = document.createElement("p");
    besk.textContent = desc;

    beskrivelse.appendChild(besk);

    //hente data til tabell, og lage tabell
    fetchFilteredData()

    // den gamle for iframe
    // changeIframe(url);


    // velge hvilke input/filtrerings-felt som vises, for hver tabell
    if (url === "/ansatte" || url === "/ettersporsel" || url === "/maned_salg" || url === "/pris_volum" || url === "/sesong_trend" || url === "/salg"){
        AddYearFilter();
    };

    if (url === "/ansatte" || url === "/maned_salg" || url === "/pris_volum" || url === "/salg"){
        AddMonthFilter();
    };

    if (url === "/ansatte"){
        AddFirstNameFilter();
        AddLastNameFilter();
        AddTitleFilter();
    };

    if (url === "/ansatte" || url === "/varer" || url === "/salg" || url === "/leverandor"){
        AddIdFilter();
    };

    if ( url === "/ettersporsel" || url === "/lagerbeholdning" || url === "/salg" || url === "/varer"){
        AddProductFilter();
    }

    if (url === "/leverandor" || url === "/snitt_verdi" || url === "/leveringstid"){
        AddCompanyFilter();
    }

    if (url === "/kategorier"){
        AddCategoryFilter();
    }

    // legge til knapp for å filtrere
    const filtKnapp  = document.createElement("button");
    filtKnapp.setAttribute("type", "button");
    filtKnapp.setAttribute("onclick", "fetchFilteredData()");
    filtKnapp.setAttribute("id", "filtreringsknapp");
    filtKnapp.textContent = "Søk/Filtrer";

    filterArea.appendChild(filtKnapp);
};

function searchTable(){

    // velge søkefeltet
    const input = document.getElementById("filterParam");
    const filter = input.value.toLowerCase();

    //velge tabellen, og radene i tabellen
    const table = document.getElementById("Tabell");
    const rows = table.getElementsByTagName("tr");

    // for hver rad i tabellen, untatt header
    for (let i = 1; i < rows.length; i++){
        const cells = rows[i].getElementsByTagName("td");
        let match = false;

        // for hver celle i raden
        for (let y = 0; y < cells.length; y++) {
            if (cells[y].textContent.toLowerCase().includes(filter)){
                match = true;
                break;
            };
        };

        // skjule/vise basert på om en rad i cellen matcher
        rows[i].style.display = match ? "" : "none";
    };

};

async function AddYearFilter() {

    // legger til ett input-område for årstall

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "yearFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "År";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "yearFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddMonthFilter(){

    // legger til ett input-område for månede

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const monthLabel = document.createElement("label");
    monthLabel.setAttribute("for", "monthFilt");
    monthLabel.setAttribute("class", "filterLabel")
    monthLabel.textContent = "Måned";

    // lage inputfelt
    const monthInput = document.createElement("input");
    monthInput.setAttribute("id", "monthFilt");
    monthInput.setAttribute("class", "filterInput")
    monthInput.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(monthLabel);
    filterFelt.appendChild(monthInput);

};

function AddCompanyFilter(){

    // filter for selskapsnavn

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "companyFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "Selskap";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "companyFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddProductFilter(){

    //filter for produktnavn

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "productFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "Produktnavn";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "productFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddFirstNameFilter(){

    //filter for fornavn

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "firstNameFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "Fornavn";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "firstNameFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddLastNameFilter(){

    //filter for etternavn

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "last NameFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "Etternavn";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "lastNameFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddIdFilter(){

    // filter for id

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "idFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "ID";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "idFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddTitleFilter (){

    // filter for tittel

    const filterFelt = document.getElementById("filterArea");

    // lage label
    const label = document.createElement("label");
    label.setAttribute("for", "titleFilt");
    label.setAttribute("class", "filterLabel")
    label.textContent = "Tittel";

    // lage inputfelt
    const input = document.createElement("input");
    input.setAttribute("id", "titleFilt");
    input.setAttribute("class", "filterInput")
    input.setAttribute("type", "text");

    // legge til i dokument
    filterFelt.appendChild(label);
    filterFelt.appendChild(input);

};

function AddCategoryFilter(){

        // filter for kategori

        const filterFelt = document.getElementById("filterArea");

        // lage label
        const label = document.createElement("label");
        label.setAttribute("for", "categoryFilt");
        label.setAttribute("class", "filterLabel")
        label.textContent = "Kategori";
    
        // lage inputfelt
        const input = document.createElement("input");
        input.setAttribute("id", "categoryFilt");
        input.setAttribute("class", "filterInput")
        input.setAttribute("type", "text");
    
        // legge til i dokument
        filterFelt.appendChild(label);
        filterFelt.appendChild(input);
}
