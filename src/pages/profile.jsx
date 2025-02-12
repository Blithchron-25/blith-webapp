import '../stylesheets/profile.css';

function Profile({ user }) {
    return (
        <div id="profile-page">
            <div id="profile_bkg"></div>
            <div id="profile">
                <div id="user-info">
                    <img id="profile_picture" src={user.profile_picture} />
                    <div id="profile_name">{user.name}</div>
                    <div id='profile_blith_credits'>{user.blith_credits}</div>
                    <div id='profile_line_2'>{user.some_data}</div>
                </div>
            </div>
        </div>
    );    
}

export default Profile;