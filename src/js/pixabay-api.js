import axios from "axios";

export async function getImagesByQuery(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(BASE_URL, {
        params: {
            key: '55050395-20e5244c38068275f8aacdcf3',
            q: query,
            page: page,
            per_page: 15,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    })
    
    return response.data;
}