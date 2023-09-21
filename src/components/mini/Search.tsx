import { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/Search.svg";
import loader from "../../assets/icons/loading.png"
import moviePic from "../../assets/images/video.jpg"

import style from './Search.module.css'
import { IPopupContext, usePopup } from "./popupContext";

import { Link } from "react-router-dom";

function Search() {
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true)
  const [searchData, setSearchData] = useState();
  const { triggerPopup } = usePopup() as IPopupContext
  useEffect(() => {
    if (filter !== "") {
      setIsLoading(true)
      const getSearchData = async () => {
        const searchList = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${filter}&limit=20`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
          }
        )
        const searchListToJson = await searchList.json();
        console.log(searchListToJson);
        
        return searchListToJson
      };
      let fetchTimeOut = setTimeout(()=> getSearchData().then((search) => {setSearchData(search); setIsLoading(false)}).catch(err=> triggerPopup("Network Error", "error")), 1000)
      return () => clearTimeout(fetchTimeOut)
    }
  }, [filter, triggerPopup]);
  return (
    <div className={style.search}>
      <div>
        <span>
          <input
          value={filter}
          type="text"
          onChange={(e) => setFilter(e.target.value.trimStart())}
          placeholder="What do you want to watch?" />
        </span>
        <span>
          <SearchIcon />
        </span>
      </div>
      {/* {
        filter !== ""
        ?
        <div>
          {
            isLoading ?
            <div className={style.loading}>
              <img src={loader} alt="loader" />
            </div> :
            (searchData?.results.length !== 0 ? 
              <></> : 
            <div className={style.loading}>No Results</div>)
            
          }
        </div>
        : null
      } */}
      
    </div>
  );
}

export default Search;
