export default function User({ user }) {

    const { 
        avatar_url: avatarUrl,
        followers,
        following, 
        public_repos: publicRepos,
        html_url: profileUrl,
        name,
        login,
        created_at: creationDate
    } 
    = user;

    const created = new Date(creationDate);


    return (
        <div className="user">
            <div>
                <img 
                src={avatarUrl} 
                alt="user avatar"
                className="avatar"/>
            </div>
            <div className="name-container">
                <a href={profileUrl}>{name || login}</a>
                <p>User joined on {created.getDate()} {created.toLocaleString('en-us', { month: "short" })} {created.getFullYear()}</p>
            </div>
            <div className="profile-info">
                <div>
                    <p>Public Repos</p>
                    <p>{publicRepos}</p>
                </div>
                <div>
                    <p>Followers</p>
                    <p>{followers}</p>
                </div>
                <div>
                    <p>Following</p>
                    <p>{following}</p>
                </div>
            </div>
        </div>
    );
}