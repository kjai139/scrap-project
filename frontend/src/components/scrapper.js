
import { useState, useRef } from 'react'
import axios from 'axios'


const Scrapper = () => {

    const [directory, setDirectory] = useState()

    const [pageTitle, setPageTitle] = useState()
    const [pageParagraphs, setPageParagraphs] = useState()
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
            setPageTitle(response.data.title)
            setPageParagraphs(response.data.paragraphs)
            console.log(response.data.paragraphs)
            console.log(pageParagraphs)
        }).catch(err => {
            console.error(err)
        })
        
    }

    return (
        <div className='App'>
            <h1 style={{padding: '1rem'}}>THE SCRAPER</h1>
            <form className='scrap-form' style={{padding: '1rem'}}>
            <label htmlFor='url-input'>Type in full Url (including https://)</label>
            <div style={{display: 'flex', gap:'5px'}}>
            <input id='url-input' type="text" ref={inputUrl}></input>
            <button onClick={handleSubmit} className='scrap-btn'>Scrape</button>
            </div>
            </form>
            <div className='resultDiv'>
                <h2>RESULTS</h2>
                <h3 className='result-title'>Page Title</h3>
                <span>{pageTitle}</span>
                <div className='result-para-div'>
                    
                    {pageParagraphs && pageParagraphs.map((node, id) => {
                        return <div className='pagePara-div'>
                            <h4 style={{margin: '1rem 0rem 1rem 0rem'}}>{`BLOCK #${id}`}</h4>
                            <button className='para-btns' key={id} >{node}</button>
                            </div>
                        
                    })}

                </div>
                
            </div>
        </div>
    )
}

export default Scrapper