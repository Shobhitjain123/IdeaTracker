import { createContext, useContext, useEffect, useState } from "react";
import services from "../appwrite/appwrite";
import { ID, Query } from "appwrite";
import config from "../config/config";


const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      const response = await services.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response, ...ideas].slice(0, 10));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await services.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, id);
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function getPost() {
    try {
      const response = await services.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
