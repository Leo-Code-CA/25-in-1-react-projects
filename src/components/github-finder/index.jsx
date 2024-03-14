import { useState } from 'react';
import SearchBar from './../search-bar/index.jsx';
import useFetch from './../../custom-hooks/useFetch.jsx';
import GithubOverview from './githuboverview.jsx';
import './style.css';

export default function GithubFinder() {

    const [githubSearchParams, setGithubSearchParams] = useState('');
    const [githubSearchBy, setGithubSearchBy] = useState('repo');
    const [userSelection, setUserSelection] = useState(null);
    const { data: githubfetchData, error: githubFetchError, pending: githubFetchPending } = useFetch(handleApiEndpoint(githubSearchParams));

    // console.log(githubfetchData);

    function handleDataListFormatting() {
        const { items: githubFetchResult } = githubfetchData ?? {};
        let gitHubDataList = [];
        if (githubFetchResult && githubSearchBy === 'repo') {
            githubFetchResult.map((data) => {
                gitHubDataList.push({
                    description: data?.description,
                    name: data?.name,
                    id: data?.id,
                    string: `${data?.name} - ${data?.owner?.login}`,
                    user: {
                        name: data?.owner?.login,
                        avatar: data?.owner?.avatar_url,
                        type: data?.owner?.type,
                        url: data?.owner?.html_url
                    },
                    topics: data?.topics,
                    url: data?.html_url,
                    language: data?.language,
                    website: data?.homepage,
                    created: data?.created_at,
                    archieved: data?.archieved
                });
            });
        } else if (githubFetchResult && githubSearchBy === 'user') {
            githubFetchResult.map((data) => {
                gitHubDataList.push({
                    username: data?.login,
                    id: data?.id,
                    string: data?.login,
                    url: data?.url,
                    repos: data?.repos_url,
                    avatar: data?.avatar_url
                });
            });
        }
        return gitHubDataList;
    }

    function handleApiEndpoint(params) {
        if (params && params.length > 0) {
            const endpointInfo = githubSearchBy === 'user' ?
            { endoint: 'users', params: encodeURIComponent(`user:${params} in:login,name,email`) } 
            : { endoint: 'repositories', params: encodeURIComponent(`${params} in:name,description`)};
            const url = `http://api.github.com/search/${endpointInfo.endoint}?q=${endpointInfo.params}`;
            return url;
        } else {
            const defaultEndpoint = githubSearchBy === 'user' ?
            { endoint: 'users', params: `user:leo-code-ca in:login`} 
            : { endoint: 'repositories', params: `25-in-1-react-projects in:name` };
            const url = `http://api.github.com/search/${defaultEndpoint.endoint}?q=${defaultEndpoint.params}`;
            return url;
        }
    }

    function handleFetchSpecificGithubData(e, id) {
        !id && e.preventDefault();
        const selectedData = id ? handleDataListFormatting().find(data => data.id === id) : handleDataListFormatting()[0];
        setUserSelection(selectedData ? selectedData : "");
        setGithubSearchParams("");
    }

    return (
        <div className="githubFinder">
            <h2>Github Finder</h2>
            <div className='githubFinder__filters'>
                <p htmlFor="githubfinderfilter">Do you want to search by user or by repo?</p>
                <div className='githubFinder__radioWrapper'>
                    <label htmlFor="githubuser">User</label>
                    <input 
                    id='githubuser' 
                    type='radio' 
                    name='githubfilter' 
                    value="user"
                    onChange={(e) => e.target.checked && setGithubSearchBy(e.target.value)}
                    checked={githubSearchBy === 'user'}
                    />
                    <label htmlFor="githubrepo">Repo</label>
                    <input 
                    id='githubrepo' 
                    type='radio' 
                    name='githubfilter' 
                    value="repo"
                    onChange={(e) => e.target.checked && setGithubSearchBy(e.target.value)}
                    checked={githubSearchBy === 'repo'}/>
                </div>
            </div>
            <SearchBar
            searchBarInfo={{
                id: "githubsearchbar",
                placeholder: "React",
                label: "Search on GitHub:"
            }}
            handleSearch={handleFetchSpecificGithubData}
            dataList={handleDataListFormatting()}
            searchParams={githubSearchParams}
            setSearchParams={setGithubSearchParams} />
            {
                userSelection ? 
                <GithubOverview 
                fetchState={githubFetchPending ? 'pending' : githubFetchError ? 'error' : null}
                currentGithubData={userSelection}
                template={githubSearchBy} />
                : null
            }
        </div>
    );
}
