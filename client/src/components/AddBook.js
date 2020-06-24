import React, { useState } from 'react';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {getAuthorsQuery,addBookMutation, getBooksQuery} from '../queries/queries';

function AddBook() {
    
    const [name,setName] = useState(''); 
    const [genre,setGenre] = useState(''); 
    const [authorId,setAuthorId] = useState(''); 
    const { loading, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const onSubmit = event => {
        event.preventDefault();
        addBook({
            variables:{
                name:name,
                genre:genre,
                authorId:authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    };

    var authors;

    if(loading)
        authors = <option disabled>Loading Authors</option>;
    else
        authors = data.authors.map(book => (<option value={book.id} key={book.id}>{book.name}</option>));

    return (
        <form id="add-book" onSubmit={onSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select authors</option>
                    {authors}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;
