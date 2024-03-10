import { useEffect } from "react";
import { useState } from "react";
import User from "./user.jsx";
import './style.css';

export default function GitHubProfileFinder() {

    const [username, setUsername] = useState("Leo-Code-CA");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    function handleSubmit() {
        fetchGitHubUserData();
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchGitHubUserData() {

        setLoading(true);

        const response = await fetch(`http://api.github.com/users/${username}`, { signal: signal });
        const data = await response.json();

        if (data) {
            setUserData(data);
            setLoading(false);
            setUsername("");
        }

    }

    useEffect(() => {

        fetchGitHubUserData();

        // return () => controller.abort();

    }, []);

    if (loading) return <h1>Loading... Please wait!</h1>;

    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input 
                type="text" 
                name="search-username" 
                placeholder="search github username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <button
                onClick={handleSubmit}
                >Search</button>
            </div>
            {
                userData !== null ?
                <User user={userData}/>
                : null
            }
        </div>
    );
}