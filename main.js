const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target) {
        throw new Error("Book constructor must be called with 'new'");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

}

function logLength()
{
    console.log("the length is", myLibrary.length);
}
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author,pages, read));
    logLength();

}
function printBooks(){
    const books = document.querySelector('.books');
    let index = 0;
    myLibrary.forEach((book, index) => {
        const row = document.createElement('row');
        row.classList.add('book-row')
        row.innerHTML = `
            <div class="attribute">${index + 1}</div>
            <div class="attribute">${book.title}</div>
            <div class="attribute">${book.author}</div>
            <div class="attribute">${book.pages}</div>
            <div class="attribute">${book.read ? 'Yes' : 'No'}</div>
            <div class='attribute'>
                <button class="toggle-read" data-id="${book.id}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
            </div>
            <div class="attribute">    
                <button class="delete" data-id="${book.id}">Delete</button>
            </div>
        `;
        row.style.flex = '1 1 100%';
        books.appendChild(row);
    });

}


//Delete Book -----------------------
const booksContainer = document.querySelector('.books');

booksContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete'))
    {
        const bookId = e.target.dataset.id;
        const rowElement = e.target.closest('.book-row');
        console.log("Deleting book with ID:", bookId);
        const index = myLibrary.findIndex(book => book.id === bookId)
        if(index !== -1)
        {
            console.log("Book found at index:", index);
            myLibrary.splice(index, 1);
        }
        rowElement.remove();
        console.log("Updated Library size", myLibrary.length);
        logLength();
        printBooks();

    }
    else if(e.target.classList.contains('toggle-read'))
    {
        const bookId = e.target.dataset.id;
        const book = myLibrary.find((bookItem) => bookItem.id === bookId);
        console.log("Retrieved toggle read input");

        if (book) {
            // ✅ toggle the read property
            book.read = !book.read;
    
            // ✅ update the "Yes/No" display in the same row
            const row = e.target.closest('.book-row');
            const readStatusDiv = row.querySelectorAll('.attribute')[4]; // 5th column
            readStatusDiv.textContent = book.read ? 'Yes' : 'No';
    
            // ✅ update the button text
            e.target.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
    
            console.log(`Book "${book.title}" read status is now:`, book.read);
        }
    }
});


//-----------------------------------------------------------------


const addBookBtn = document.querySelector('.addBook');
const dialog = document.getElementById('dialog');
const form = document.getElementById('form');

//Show Dialog

addBookBtn.addEventListener('click', () => dialog.showModal());

//Add book to list
form.addEventListener('submit', (e) => {
    e.preventDefault(); // ✅ prevent page refresh

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    form.reset();
    dialog.close();
    printBooks();
});


//Close Page
const close = document.getElementById('close-btn');

close.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    dialog.close();
});
