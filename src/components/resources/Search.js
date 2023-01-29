import Location from "./modal/Location";

function Search({setLocation, setSearch}) {
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target[0].value);
    }

    return (
        <form className="d-flex flex-row bd-highlight mb-2" onSubmit={handleSearch}>
            <input className="form-control mx-1" placeholder="Search businesses" aria-label="Search"/>
            <Location setLocation={setLocation}/>
        </form>
    )
}

export default Search;