const key = (value) => {
    if(value === 'logout'){
        localStorage.removeItem("key");
    } else if(value === 'get'){
        return localStorage.getItem("key");
    }else{
        localStorage.setItem("key", value);
    }
}

export default key;