// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Pagination = () => {
//     const [tracks, setTracks] = useState([])

//     useEffect(()=> {
//         axios.get('http://localhost:5000/tracks', {
//             params: {
//                 count: 1,

//             }
//         })
//             .then(response => setTracks(response.data))
//     },[])

//     useEffect(()=> {
//         document.addEventListener('scroll', scrollHandler)

//         return function () {
//             document.removeEventListener('scroll', scrollHandler)
//         }
//     },[])

//     const scrollHandler = (e: any) => {

//     }

    
// }

// export default Pagination;
