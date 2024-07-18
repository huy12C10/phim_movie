const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '8d4bcd4003f672a9fc900e48f89cb789',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;