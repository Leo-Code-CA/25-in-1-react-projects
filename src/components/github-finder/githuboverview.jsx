import useFetch from './../../custom-hooks/useFetch.jsx';
import { FaGithub } from 'react-icons/fa';
import { HiMiniComputerDesktop } from "react-icons/hi2";

export default function GithubOverview({ fetchState, currentGithubData, template }) {

    const { data: userData, error: userDataError, pending: userDataPending } = useFetch(template === 'user' ? currentGithubData?.url : {});
    const { data: userRepos, error: userReposError, pending: userReposPending } = useFetch(template === 'user' ? currentGithubData?.repos : {});

    function handleDateFormatting(date) {
        return new Date(date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    if (currentGithubData && template) return (
        <div className="githubFinder__overview">
            {
                template === 'user' ?
                <div className="githubFinder__userTemplate">
                    <h3>
                        <a href={userData?.html_url}>{userData?.login} </a><span>{userData?.name}</span>
                    </h3>
                    <div className='githubFinder__userProfile'>
                        <img src={currentGithubData?.avatar} alt={`${currentGithubData?.username}'s GitHub Avatar`} />
                        <div>
                            <b>Bio:</b>
                            <p>{userData?.bio}</p>
                            <b>A Few Facts About {userData?.login}:</b>
                            <ul>
                                <li>On GitHub since {handleDateFormatting(userData?.created_at)}</li>
                                <li>{userData?.login} has {userRepos?.length} repos</li>
                                <li>{userData?.company ? `Works at ${userData?.company}` : "This folk hasn't registered any company yet!"}</li>
                                <li>{userData?.location ? `Located in ${userData?.location}` : 'No location has been provided so far'}</li>
                                <li>{userData?.twitter_username ? `{userData?.twitter_username}` : 'No twitter profile known'}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='githubFinder__userRepos'>
                        {
                            userRepos && userRepos?.length > 0 ?
                            userRepos.slice(0, 8).map(repo => 
                                <div key={repo?.id} className='githubFinder__userSingleRepo'>
                                    <h4><a href={repo?.html_url}>{repo?.name}</a></h4>
                                    <em>{handleDateFormatting(repo?.created_at)}</em>
                                    <b>Repo Description:</b>
                                    <p>{repo?.description ? repo?.description : "No description has been provided yet for this repository!"}</p>
                                    <div>
                                        <dl>
                                            <dt>Language</dt>
                                            <dd>{repo?.language}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Archived</dt>
                                            <dd>{repo?.archived ? 'true' : 'false'}</dd>
                                        </dl>
                                    </div>
                                </div>
                            )
                            : <p>This user has no public repositiries yet!</p>
                        }
                    </div>
                </div>
                : template === 'repo' ?
                <div className="githubFinder__repoTemplate">
                    <h3>
                        <a href={currentGithubData?.url}>{currentGithubData?.name}</a>
                    </h3>
                    <p className="githubFinder__repoDescription">{currentGithubData?.description}</p>
                    <div className="githubFinder__repoDetails">
                        <dl className="githubFinder__repoData">
                                <dt>Languague(s)</dt>
                                <dd>{currentGithubData?.language}</dd>
                        </dl>
                        <div className="githubFinder__repoData">
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
                        <dl className="githubFinder__repoData">
                            <dt>Creation Date</dt>
                            <dd>{handleDateFormatting(currentGithubData?.created)}</dd>
                        </dl>
                        <dl className="githubFinder__repoData">
                            <dt>Archived</dt>
                            <dd>{currentGithubData?.archieved ? 'true' : 'false'}</dd>
                        </dl>
                    </div>
                    <div className="githubFinder__repoOwner">
                        <h4>About The Owner</h4>
                        <div className='githubFinder__repoOwnerDetails'>
                            <dl>  
                                <a href={currentGithubData?.user?.url}>
                                    {
                                        currentGithubData?.user?.avatar ?
                                        <dd>
                                            <img src={currentGithubData?.user?.avatar} alt={`${currentGithubData?.user?.name}'s GitHub Avatar`} />
                                        </dd>
                                        : <dd><FaGithub /></dd>
                                    }
                                    <dt>{currentGithubData?.user?.name}</dt>
                                </a>
                            </dl>
                            <dl>
                                <dd>{currentGithubData?.user?.type}</dd>
                                <dt>Type</dt>
                            </dl>
                            <dl>
                                {
                                    currentGithubData.website ?
                                    <a href={currentGithubData.website}>
                                        <dt>Owner's Website</dt>
                                        <dd><HiMiniComputerDesktop /></dd>
                                    </a>
                                    : <><dt>The owner of this repo hasn't provided any personal website</dt>
                                    <dd><HiMiniComputerDesktop /></dd></>
                                }
                            </dl>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );

    if (fetchState === 'error') return <p>Sorry, an error occured. Please, try again.</p>;
    if (fetchState === 'pending') return <p>The data you requested is currently loading! It shouldn't take long!</p>;
}