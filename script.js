// error div
const errorDiv = document.getElementById("error");

// display search result
const displayResults = document.getElementById('display-result'); 

// variable for Total number of search result
const totalSearch = document.getElementById('total-search');


const searchBook = () => {
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;
    // console.log(searchText);

    // error handling if input field is empty
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
       totalSearch.innerHTML = "";
       displayResults.innerHTML = "";
        return;
         
      }
 
    // clear data
    searchField.value = "";
    displayResults.innerHTML = "";
    totalSearch.innerHTML = "";
    errorDiv.innerText = "";
      
     
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    // .then(data => displaySearchResult(data));
    .then((data) => {
        // Setting a timer of 1.5s, before removing the spinnner, and showing data
        setTimeout(() => {
          spinner.classList.add("d-none");
          displaySearchResult(data);
        }, 1500);
      })
      .finally(() => {
        searchField.value === "";
      });
 
}


const displaySearchResult = data => {
    // console.log(books);

    const books = data.docs;
    // Error Handing
    if (books.length === 0) {
        errorDiv.innerText = `No Result Found. 
                              Please search with a different keyword.`;
        totalSearch.innerHTML = "";
       displayResults.innerHTML = "";
        return;
    } 


    //   forEach loop
    
    books.forEach(book => {

        // error validation for undefined surthor_name
        let author;
        if(book.author_name !== undefined){
            author = book.author_name[0];
        //    console.log(author);
         }else{
            author = 'name is not privided';
            // console.log(author);
         }

        // end of error validation 

         // error validation for undefined publisher
        let publisher;
        if(book.publisher !== undefined){
            publisher = book.publisher[0];
         }else{
            publisher = 'publisher name is not privided';
         }

         let coverI;
        if(book.cover_i !== undefined){
            coverI = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
         }else{
            coverI = `image1.jpg`;
         }


        // create new div
        const div = document.createElement('div');
        div.classList.add('col');
        

        div.innerHTML = `
            <div class="card h-100">
                <img src="${coverI}" class="card-img-top" height="400px" alt="...">
                <div class="card-body">
                <h5 class="card-title">Book Name: ${book.title}</h5>
                <p class="card-text">Aurthor: ${author}</p>
                <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                </div>
            </div>
        `;
 
        displayResults.appendChild(div);
        // console.log(book.length);

    });
    

    // Total number of search result
    const h3 = document.createElement('h3');
    h3.classList.add('text-center')
    h3.innerText = `Showing total number of Books: ${books.length} 
                    Total result found: ${data.numFound}`;

    totalSearch.appendChild(h3);
    

};

