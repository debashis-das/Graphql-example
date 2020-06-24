import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getBookQuery} from '../queries/queries';

function BookDetails({bookId}) {
    const { loading, data } = useQuery(getBookQuery,{
        variables: { id: bookId },
        skip: !bookId
    });
    if(data){
        // console.log(data);
        return( 
            <div id="book-details">
                <h2>{data.book.name}</h2>
                <p>{data.book.genre}</p>
                <p>{data.book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {
                        data.book.author.books.map(item =>{
                            return <li key={item.id}>{item.name}</li>
                        })
                    }
                </ul>
            </div>
        );
    }else{
        return( 
            <div id="book-details">
                <div>No Book selected</div>
            </div>
        );
    }
}

export default BookDetails;