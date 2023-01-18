import axios from "axios";
import {url} from "../model/api/index"

export class IBaseService {
    async getAll (url:string):Promise<url> {
        let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`);
        let shortLink: url=response.data.result
        return shortLink;
    }}