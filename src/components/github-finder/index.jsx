import { useState } from 'react';
import SearchBar from './../search-bar/index.jsx';
import useFetch from './../../custom-hooks/useFetch.jsx';
import GithubOverview from './githuboverview.jsx';
import './style.css';

export default function GithubFinder() {

    const [githubSearchParams, setGithubSearchParams] = useState('');
    const [githubSearchBy, setGithubSearchBy] = useState(null);
    const [userSelection, setUserSelection] = useState(null);
    const { data: githubfetchData, error: githubFetchError, pending: githubFetchPending } = useFetch(handleApiEndpoint(githubSearchParams));

    console.log(githubfetchData);
    // ADD FOR REPO: contributors_url: created_at: homepage: pushed_at: "

    // console.log(githubfetchData, githubFetchError, githubFetchPending);
    console.log(handleApiEndpoint(githubSearchParams));

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
                        avatar: data?.owner?.avatar_url
                    },
                    topics: data?.topics,
                    url: data?.url,
                    language: data?.language,
                    website: data?.homepage
                });
            });
        } else if (githubFetchResult && githubSearchBy === 'user') {
            githubFetchResult.map((data) => {
                gitHubDataList.push({
                    name: data?.login,
                    id: data?.id,
                    string: data?.login,
                    org: data?.organizations_url,
                    url: data?.url,
                    repos: data?.repos_url,
                    avatar: data?.avatar_url
                });
            });
        }
        return gitHubDataList;
    }

    // console.log(handleDataListFormatting());

    function handleApiEndpoint(params) {
        if (params && params.length > 0) {
            const endpointInfo = githubSearchBy === 'user' ?
            { endoint: 'users', params: encodeURIComponent(`user:${params} in:login,name,email`) } 
            : { endoint: 'repositories', params: encodeURIComponent(`${params} in:name,description`)};
            const url = `http://api.github.com/search/${endpointInfo.endoint}?q=${endpointInfo.params}`;
            return url;
        } else {
            const url = `http://api.github.com/search/users?q=leo-code-ca`;
            return url;
        }
    }

    function handleFetchSpecificGithubData(e, id) {
        !id && e.preventDefault();
        const selectedData = id ? handleDataListFormatting().find(data => data.id === id) : handleDataListFormatting()[0];
        console.log(selectedData);
        setUserSelection(selectedData ? selectedData : "");
        setGithubSearchParams("");
    }

    return (
        <div className="githubFinder">
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
                    />
                    <label htmlFor="githubrepo">Repo</label>
                    <input 
                    id='githubrepo' 
                    type='radio' 
                    name='githubfilter' 
                    value="repo"
                    onChange={(e) => e.target.checked && setGithubSearchBy(e.target.value)}/>
                </div>
            </div>
            {
                userSelection ? 
                <GithubOverview 
                error={githubFetchError}
                pending={githubFetchPending} 
                currentGithubData={userSelection}
                template={githubSearchBy} />
                : null
            }
        </div>
    );
}
