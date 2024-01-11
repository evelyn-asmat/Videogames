import '../styles/components/loading.css'

export default function Loading(props) {
    return (
        <div className={`loading ${props.isLoading ? '' : 'hidden'}`} >
            <div className="pacman">
                <div className="pacman-top"></div>
                <div className="pacman-bottom"></div>
                <div className="feed"></div>
            </div>
            <div className='loading-text'>... Loading</div>
        </div>
    );
}