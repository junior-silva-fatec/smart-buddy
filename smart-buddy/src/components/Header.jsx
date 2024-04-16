import { Link } from "react-router-dom";

function Header() {

    const handleLoginClick = () => {
    };

    return (
        <div id="header">
            <Link to="/"><h1>Smart Buddy</h1></Link>{" "}
            <Link to="/login"><button>login</button></Link>
        </div>
    );
}

export default Header;
