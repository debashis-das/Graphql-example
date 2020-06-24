import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';
function BookList() {
    const [selected,setSelected] = useState(null);
    const { loading, data } = useQuery(getBooksQuery);
    const onClick  = ()=> {

    }
    if (loading) {
        return <div>Loading books...</div>;
    }else{
        return(
            <div> 
                <div>
                    <ul id="book-list">
                        {data.books.map(book => (<li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>))}
                    </ul>
                </div>
                <BookDetails bookId={selected}/>
            </div>
        );
    }
}

export default BookList;
