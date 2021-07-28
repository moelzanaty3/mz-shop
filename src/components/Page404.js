import React from 'react'
const Page404 =(props)=>{
    function handleRedirectToHome (){
        props.history.push(`/`)
    }
    return (
        <div >
            <h1 className="alert">
                page not found , you can go back  
            </h1>
            <button className='backBtn' onClick={handleRedirectToHome} >
                To Home Page
            </button>
        </div>
    );
}

export default Page404;
