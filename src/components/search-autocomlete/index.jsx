import { useEffect, useState } from "react";
import Suggestions from "./suggestions";
import './style.css';

export default function SearchAutocomplete() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    function handleChange(e) {

        const query = e.target.value.toLowerCase();
        setSearchParam(query);

        if (query.length > 1) {
            const filteredData = users && users.length ?
            users.filter(item => item.toLowerCase().indexOf(query) > - 1)
            : [];
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    function handleClick(e) {
        // console.log(e.target.innerText);
        setShowDropdown(false);
        setSearchParam(e.target.innerText);
        setFilteredUsers([]);
    }

    async function fetchListOfUsers() {

        try {

            setLoading(true);
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();

            // console.log(data);

            if (data && data.users && data.users.length) {
                setUsers(data.users.map(userItem => userItem.firstName));
                setLoading(false);
                setError(null);
            }

        } catch(error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchListOfUsers();
    }, []);

    // console.log(users, filteredUsers);


    return (
        <div className="search-autocomplete-container">
            {
                loading ? <h1>Loading data, please wait...</h1> 
                : <input type="text"
                name="search-users"
                placeholder="search users here..." 
                value={searchParam}
                onChange={handleChange}/>
            }
            {
                showDropdown && <Suggestions handleClick={handleClick} data={filteredUsers}/>
            }
        </div>
    );
}