import React from 'react';

export default function HeaderComponent({component}){
    const componentName = component
    return(
        <React.Fragment>
        <div className='Component-Header'>
            <div className='row'>
                <div className='col'>
                    <div className='center'>
                        <h1 className='Component-Header-Text green'>{componentName}</h1>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}