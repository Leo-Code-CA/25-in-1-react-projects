

export default function GithubOverview({ error, pending, currentGithubData, template }) {

    if (error) return <p>Sorry, an error occured: {error}. Please, try again.</p>;
    if (pending) return <p>The data you requested is currently loading! It shouldn't take long!</p>;

    return (
        <div className="githubFinder__overview">
            <h3>{currentGithubData?.string}</h3>
            {
                template === 'user' ?
                <div className="githubFinder__userTemplate">
                    <img src={currentGithubData?.avatar} alt={`${currentGithubData?.name}'s GitHub Avatar`} />
                    <p>{currentGithubData?.org}</p>
                    <p>{currentGithubData?.repos}</p>
                </div>
                : template === 'repo' ?
                <div className="githubFinder__repoTemplate">
                    <p className="githubFinder__repoDescription">{currentGithubData?.description}</p>
                    <div className="githubFinder__LanguageAndTopicsWrapper">
                        <dl className="githubFinder__repoLanguage">
                                <dt>Languague(s)</dt>
                                <dd>{currentGithubData?.language}</dd>
                        </dl>
                        <div className="githubFinder__repoTopics">
                            <h5>Topics</h5>
                            <ul>
                                {
                                    currentGithubData.topics && currentGithubData.topics.length > 0 ?
                                    currentGithubData.topics.map((topic, i)=> 
                                    <li key={currentGithubData?.id + i}>
                                        {topic}
                                    </li>)
                                    : "No Topics For This Repo!"
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4>About The Owner</h4>
                        <img src={currentGithubData?.avatar} alt={`${currentGithubData?.name}'s GitHub Avatar`} />
                        <dl>
                            <dd>{currentGithubData.website ? currentGithubData.website : null}</dd>
                            <dt>Owner's Website</dt>
                        </dl>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

// Repo
// description: data?.description,
// name: data?.name,
// id: data?.id,
// string: `${data?.name} - ${data?.owner?.login}`,
// user: {
//     name: data?.owner?.login,
//     avatar: data?.owner?.avatar_url
// },
// topics: data?.topics,
// url: data?.url,
// language: data?.language,
// website: data?.homepage


// User
// name: data?.login,
// id: data?.id,
// string: data?.login,
// org: data?.organizations_url,
// url: data?.url,
// repos: data?.repos_url,
// avatar: data?.avatar_url