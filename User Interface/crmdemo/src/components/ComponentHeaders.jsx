import React from 'react';

export default function HeaderComponent(componentName) {
    return(
    <div className='Component-Header'>
        <div className='row'>
            <div className='col'>
                <div className='center'>
                    <h1 className='Component-Header-Text green'>{componentName}</h1>
                </div>
            </div>
        </div>
    </div>
    )
}


// import React from 'react';

// export default function HomeComponent() {
//     return(
//         <React.Fragment>
//             <div className="container">
//                 <div className="rounded-corners">
//                     Hello
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }