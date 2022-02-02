import {useSelector} from "react-redux";

const Profile = () => {
    const loggedUser = useSelector(({UserDuck}) => UserDuck.loggedInUser);
    console.log(loggedUser);
    return (
        <>
            <br/>
            fake User <br/>
            {loggedUser.name}
            <br/>
            {loggedUser.email}
            <br/>
            {loggedUser.phone}
        </>
    );
};

export default Profile;