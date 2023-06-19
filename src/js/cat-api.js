const BASE_URL = "https://api.thecatapi.com/v1/breeds"
const BASE_KEY ="live_64TYORPX0VJ9Ekup3VKvZFxRIQn2NbHd52y9kzoHpkiAmyS9WBH5HuOotQcnCd4O"

export function fetchBreeds() {
    return fetch(`${BASE_URL}?api_key=${BASE_KEY}`).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.status)
        }
        return resp.json();
    })
};

 export function fetchCatByBreed(breedId) {
    
     return fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${breedId}&api_key=${BASE_KEY}`)
      
         .then(resp => {
             if (!resp.ok) {
                 throw new Error(resp.status)
             }
             return resp.json();
         });
}; 