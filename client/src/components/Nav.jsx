import SearchBar from './SearchBar';

export default function Nav(props) {
    return (
        <div className="navbar">
            <img src="/videogame.svg" alt="Videogame Logo" height="30px"/> VIDEOGAMES
            <SearchBar onSearch={props.onSearch} />
        </div>
    );
}