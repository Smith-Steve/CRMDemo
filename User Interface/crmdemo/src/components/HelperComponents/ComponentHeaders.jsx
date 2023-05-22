import React from 'react';

export default function HeaderComponent({component}){
    //this variable is named wrong for the 'Customer Profile Page' component.
    // Since this is a demo app, we are going to leave it this way for now.
    return(
        <React.Fragment>
        <div className='Component-Header'>
            <div className='row'>
                <div className='col'>
                    <div className='center'>
                        <h1 className='Component-Header-Text green'>{component}</h1>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}