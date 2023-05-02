
import { useState, useRef } from 'react'
import axios from 'axios'


const Scrapper = () => {

    const [directory, setDirectory] = useState()
    const inputUrl = useRef(null)
    const instance = axios.create({
        baseURL: 'http://localhost:4000'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputUrl.current.value)

        instance.get('scrape', {
            params: {
                url:inputUrl.current.value
            }
        }).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.error(err)
        })
        
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