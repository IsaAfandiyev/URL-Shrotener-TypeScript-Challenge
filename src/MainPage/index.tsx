import React, {useState} from "react";
import {url} from "../model/api";
import {IBaseService} from "../services";


function MainPage () {
    const [inputValue,setInputValue] = useState<string>('');
    const [shortLink,setShortLink] = useState<url[]>([]);

    const formSubmit = (e:any)=>{
        e.preventDefault()
        let baseService = new IBaseService()
        baseService.getAll(inputValue)
            .then(data=>{
                setShortLink([...shortLink,{
                    original_link:data.original_link,
                    short_link:data.short_link
                }])
            })
            .catch(error=>{
                console.error('error')
                return error
            })
        setInputValue('')
    }

    const copyShortLink = (url:string) =>{
        navigator.clipboard.writeText(url)
    }

    return (
        <div>
            <h1>enter your url</h1>
            <form onSubmit={(e) => formSubmit(e)} >
                <div >
                    <input  value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='write your link' />
                </div>
                <div>
                    <button>add link</button>
                </div>
            </form>
            <div >
                {shortLink &&
                    React.Children.toArray(
                        shortLink.map((item: any) =>
                            (
                                <div >
                                    <div>{item.original_link}</div>
                                    <div >
                                        <a href={item.shortLink} >{item.short_link}</a>
                                        <button onClick={() => copyShortLink(item.short_link)}
                                        >Copy</button>
                                    </div>
                                </div>
                            )))
                }
            </div>
        </div>
    )



}
export default MainPage;