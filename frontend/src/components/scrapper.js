
import { useState, useRef } from 'react'


const Scrapper = () => {

    const [directory, setDirectory] = useState()
    const inputUrl = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputUrl.current.value)
        
    }

    return (
        <div>
            <form>
            <label htmlFor='url-input'></label>
            <input id='url-input' type="text" ref={inputUrl}></input>
            <button onClick={handleSubmit}>Scrape</button>
            </form>
        </div>
    )
}

export default Scrapper