import Dropdown from "./dropdown";
import { IoSearch } from "react-icons/io5";
import './style.css';

export default function SearchBar({ searchBarInfo, handleSearch, dataList, searchParams, setSearchParams }) {

    return (
        <div className="searchBar">
             <form className="searchBar__form">
                <label htmlFor={searchBarInfo?.id}>{searchBarInfo?.label}</label>
                <div className={dataList && dataList.length > 2 && searchParams && searchParams.length > 2 ? "searchBar__inputWrapper searchBar__inputWrapper--active" : "searchBar__inputWrapper"}>
                    <input 
                    type="text" 
                    name={searchBarInfo?.id} 
                    id={searchBarInfo?.id}
                    placeholder={searchBarInfo?.placeholder}
                    value={searchParams} 
                    onChange={(e) => setSearchParams(e.target.value)}>
                    </input>
                    <button 
                    type="submit"
                    onClick={(e) => handleSearch(e)}>
                        <IoSearch />
                    </button>
                </div>
             </form>
             <Dropdown searchParams={searchParams} dataList={dataList} handleSearch={handleSearch}/>
        </div>
    );
}