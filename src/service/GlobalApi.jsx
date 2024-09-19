import axios from "axios";

const BaseAPI = "https://places.googleapis.com/v1/places:searchText"

const config = {
    headers: {
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ],
        'Content-Type': 'application/json'
    }
};

export const GetPlaceDetails = (data) => axios.post(BaseAPI, data, config);

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=`+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;