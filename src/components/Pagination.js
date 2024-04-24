import React, { useState } from 'react';

function Pagination ({parPage, total, paginate}){
    const numPage = [];

    for (let i = 1; i <= Math.ceil(total / parPage); i++){
        numPage.push(i);
    }

    //eslint-disable-next-line
    const [page, setPage] = useState(1);

    const handlePageClick=(numero)=>{
        setPage(numero);
        paginate(numero)

    }

    return(
        <div>
            <nav>
                <ul>
                    {numPage.map((numero)=>(
                        <li key={numero}>
                            <a href="/artist/#"
                                onClick={()=> {
                                handlePageClick(numero);
                                paginate(numero);
                            }}>{numero}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;