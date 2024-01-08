import "../styles/components/landing.css";

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-box pixel-box">
            <p>VIDEOGAMES</p>
            <p>By Evelyn Asmat</p>
            <Link to="/home">
                <button>&lt; PRESS START &gt;</button>
            </Link>
        </div>
    );
 }
 