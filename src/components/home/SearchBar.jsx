"use client"
import React, { useEffect } from 'react'

export default function SearchBar() {

    // INPUT STATE VARIABLE
    const [input, setInput] = useState("");

    // SEARCH RESULTS MATCHING FROM DB
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    // GET SEARCH RESULTS BASED ON USER INPUT
    useEffect(()=> {

        const fetchData = async () => {
            let res = fetch("/api/search", {
                method : "GET",
                body : JSON.stringify({
                    user_input : input
                })
            })
    
            res = await res.json()

            // SET SEARCH RESULTS STATE VARIABLE
            setSearchResults(res)
        }

        // call the function
        fetchData()
        // make sure to catch any error
        .catch(console.error);

    }, [input])

  return (
    <div>

        <input autoFocus onChange={handleChange} value={input} name="service_provider" placeholder='Search username' type="text" 
        className='text-sm shadow-lg mt-5 pl-3 text-gray-400 w-[40rem] h-[3rem] rounded-md focus:outline-none'/>

        { 
            (searchResults.length > 0) 
            ? <>
                {
                    searchResults.map((elm,index) => 
                        <div key={index} className=''>
                            <h3>
                                {elm}
                            </h3>
                        </div>
                    )
                }
            </>
            : null
            
        }

    </div>
  )
}
