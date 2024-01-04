import { useState } from "react";

export default function SearchBar(props) {
    const [name, setName] = useState("");

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleClick = event => {
        event.preventDefault();
        props.onSearch(name);
    }

    return (
        <div className="search-bar">
            <input type='search' onChange={handleChange} value={name} placeholder="Name" />
            <button onClick={handleClick}>Search</button>
        </div>
    );
}