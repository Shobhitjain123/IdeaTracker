import config from '../config/config'
import { Client, Databases, Account } from "appwrite";

export class Service{
    client = new Client()
    databases
    account

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.account = new Account(this.client)
    }
}
    const service = new Service()

export default service