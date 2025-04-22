import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'https://hybrid.srishticampus.in//',
  
  // For local development (comment out the above and uncomment below)
  baseURL: 'http://localhost:4004/atrisan_connect/',
  
  headers: {
    'Content-Type': 'application/json',
  },
  // Recommended to add timeout to prevent hanging
  timeout: 5000, // 5 seconds
});


// Export the image base URL separately
// export const imageBaseUrl = 'https://hybrid.srishticampus.in/'; 
export const imageBaseUrl = 'http://localhost:4004'; 
// or for local: 'http://localhost:4053/'

export default axiosInstance;