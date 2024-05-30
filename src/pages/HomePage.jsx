import {Link} from "react-router-dom";

function HomePage() {
    return (
        <>
            <h1>HomePage</h1>
            <Link to={"/login"}><h2>Login</h2></Link>
            <Link to={"/register"}><h2>Register</h2></Link>
        </>
    )
}

export default HomePage;
