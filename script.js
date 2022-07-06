

(function () {
  //creiamo un array di 12 oggetti chiamato newProducts:

  const newProducts = [
    { id: 1, name: "TV", price: 400, stock: 56 },
    { id: 2, name: "PC", price: 1200, stock: 48 },
    { id: 3, name: "Phon", price: 52, stock: 64 },
    { id: 4, name: "Radio", price: 64, stock: 12 },
    { id: 5, name: "Keybard", price: 30, stock: 596 },
    { id: 6, name: "Mouse", price: 20, stock: 85 },
    { id: 7, name: "Tablet", price: 164, stock: 2 },
    { id: 8, name: "Pendrive", price: 15, stock: 5 },
    { id: 9, name: "Hard disk", price: 70, stock: 128 },
  ];

  //creiamo un oggetto chiamato 'shop' al cui interno collochiamo :
  //---------1. il numero di pagina corrente 'page',
  // --------2. il numero di elementi che vogliamo mostrare per ogni pagina 'perPage',
  //---------3. un array vuoto chiamato 'products'
  //---------4. la funzione getter chiamata "getProducts"
  //---------5. la funzione setter chiamata "setProducts"
  //---------6. html
  //---------7. settare pagina

  const shop = {
    /*1.*/ page: 0,

    /*2.*/ perPage: 3,

    /*3.*/ productsArray: [],

    /*4.*/
    //il getter contiene il codice eseguito per ottenere 'qualcosa'; getter viene eseguito quando questo qualcosa viene chiamato('letto'):  diventa un alias per tutto ciò che contiene
    get getProducts() {
      //vogliamo che la funzione get  ci 'ritorni' i prodotti presi dall'array productsArray (ancora è vuoto,lo riempiremo con il set)
      //vogliamo però che vengano 'tornati' soltanto un tot di prodotti per ogni pagina => applichiamo all'array productsArray  il metodo slice*
      //slice ritorna un nuovo array(qui chiamato slicedProducts) contenente gli elementi all'interno di un range di indici che gli andiamo a specificare

      const startIndex = this.page * this.perPage; //utlizzato come indice d'inizio del range
      const endIndex = startIndex + this.perPage; //utlizzato come indice di fine del range

      const slicedProducts = this.productsArray.slice(startIndex, endIndex);

      return slicedProducts;
    },

    /*5.*/
    //il setter contiene il codice che ci permette di assegnare 'un valore'; setter viene eseguito solo quando questo valore viene impostato('scritto').
    //Una funzione di accesso 'set' deve contenere un (ed un solo) parametro, nel nostro caso ci interessa impostare un valore all'array productsArray che è ancora vuoto
    set setProducts(products) {
      this.productsArray = products; //setProducts opera adesso in funzione del nostro array, visto che ne è il parametro

      //vogliamo che ogni volta che attribuiamo un valore al setter venga eseguita la messa in pagina, definiamo quindi l'html
      this.renderHTML(); //potremmo farlo qui ma è meglio utilizzare definire html a parte e richiamarcelo così
    },

    renderHTML() {
      const productsHTML = this.getProducts
        .map((product) => {
          const { name, price } = product;
          return `<li>${name} - ${price}€</li>`;
        })
        .join("");

      document.querySelector(".shop").innerHTML = `
          <h2>Offerte lampo</h2>
          <div>Page: ${this.page}</div>
          <div>Showing: ${this.getProducts.length}/${this.productsArray.length}</div>
          <ul>${productsHTML}</ul>
      `;
    },
    setPage(newPage) {
      this.page = newPage;
      this.renderHTML();
    },
  };

  shop.setProducts = newProducts;

  //Applicare l'`Event Delegation` sulla paginazione inserendo un solo event lister per i 3 bottoni;

  const $pagination = document.querySelector(".pagination");
  $pagination.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      event.preventDefault();

      console.log("stai cliccando su un button");
      const buttonEl = event.target;
      const newPage = Number(buttonEl.innerText) - 1;

      shop.setPage(newPage);
    }

    // const $buttons = document.querySelectorAll(".button");
    // console.log($buttons);

    // $buttons.forEach(function (currentBtn) {
    //   currentBtn.addEventListener("click", function (event) {
    //     console.log("stai cliccando su un button");
    //     const buttonEl = event.target;
    //     const newPage = Number(buttonEl.innerText) - 1;

    //     shop.setPage(newPage);
    //     event.preventDefault();
    //   });------>prova con il .forEach
  });
  
  //Applicare l'`Event Delegation` sulla lista per lanciare al click di ogni prodotto un alert con stock e prezzo.
  const $prodList = document.querySelector(".shop");
  $prodList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      alert(`prezzo:   in stock:`);//devo trovare il modo di passare qui stock e price 
    }
  });
})();
