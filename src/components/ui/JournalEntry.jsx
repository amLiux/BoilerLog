import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry mt-5 mb-5 pointer">
            {/* <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://wallpapercave.com/wp/wp6540456.jpg)'
                }}
            ></div> */}

            <div className="journal__entry-body">
                <p className="journal__entry-title">Un nuevo lorem</p>
                <p className="journal__entry-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quis dicta </p>
            </div>

            <p className="journal__entry-date-box">22/10/24</p>

        </div>
    )
}
