import React, { useEffect, useState, useRef, useCallback } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMoveImmutable from "array-move";
import {FilterDataAdvanced} from  "filter-data-advanced/dist/FilterDataAdvanced";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, A11y, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import styles from "./Home.module.css";
// import { Link } from "react-router-dom";
// import { IPopupContext, usePopup } from "../components/mini/popupContext";
import CardModal from "../components/mini/CardModal";
import { ReactComponent as SearchIcon } from "../assets/icons/Search.svg";
import loader from "../assets/icons/loading.png"
export interface DataI {
  name: string;
  tags: string[];
  img: { src: string; orientation: string }[];
}

function Home() {
  const cardHolder = useRef(null)
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataI[] | null>(null);
  const [filterData, setFilterData] = useState<DataI[] | null>(null);
  const [filter, setFilter] = useState<string>("");
  const getStaticData = () => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://hngx-3-adeola.netlify.app/assets/data/animals.json"
        : "http://localhost:3000/assets/data/animals.json";
    return fetch(url);
  };
  const onSortEnd = (oldIndex: any, newIndex: any) => {
    setFilterData((array) =>
      arrayMoveImmutable(array ? array : [], oldIndex, newIndex)
    );
    oldIndex = data?.findIndex((el) =>{
      return el.name === (filterData as DataI[])[oldIndex].name
    });
    newIndex = data?.findIndex((el) =>{
      return el.name === (filterData as DataI[])[newIndex].name
    });
    setData((array) =>
      arrayMoveImmutable(array ? array : [], oldIndex, newIndex)
    );
  };
  const filterDataH = useCallback(() => {
    let obj = new FilterDataAdvanced()
    let objF = obj.filterByKeyValue(data ? data.map(el => {return {...el,search: [el.name, ...el.tags]}}) : [], "search", filter);
    return objF.map(el => {return {name: el.name, tags: el.tags, img: el.img}})
  }, [filter, data])
  useEffect(()=> {
    if (filter !== "") {
      setIsPageLoaded(false)
    }
    let timeout = setTimeout(() => setIsPageLoaded(true), 1500);
    setFilterData(filterDataH)
    return () => {
      clearTimeout(timeout)
    };
  }, [filter, filterDataH])
  useEffect(() => {
    let timeout = setTimeout(() => setIsPageLoaded(true), 2000);
    if (data) {
      localStorage.setItem("anichive-data", JSON.stringify(data));
    }
    return () => {
      clearTimeout(timeout)
    };
  }, [data]);
  useEffect(() => {
    setIsPageLoaded(false);
    let localData = localStorage.getItem("anichive-data");
    if (localData) {
      setData(JSON.parse(localData));
    } else {
      getStaticData()
        .then((data) => data.json())
        .then((data) => setData(data))
        .catch((err) => {
          console.log(err);

          console.log(err.message);
        });
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.search_box}>
        <div>
          <span>
            <input
            value={filter}
            type="text"
            onChange={(e) => setFilter(e.target.value.trimStart())}
            placeholder="search by name and tag e.g frog, aquatic, hairy" />
          </span>
          <span>
            <SearchIcon />
          </span>
        </div>
        </div>
        {!isPageLoaded ? (
          <div className={styles.loading}>
            <img src={loader} alt="loader" />
          </div>
        ) : (
          <section id={styles.cards} ref={cardHolder}>
            {(data && filterData && filterData.length > 0) ? (
              <SortableList
                onSortEnd={onSortEnd}
                className={styles.list}
                draggedItemClassName={styles.dragged}
                customHolderRef={cardHolder}
              >
                { filterData.map((animal: DataI) => {
                  return (
                    <SortableItem key={animal.name}>
                      <CardModal data={animal} />
                    </SortableItem>
                  );
                })}
              </SortableList>
            ) : 
            <div className={styles.loading}>
              No Results
            </div>
            }
          </section>
        )}
      </div>
    </>
  );
}

export default Home;
