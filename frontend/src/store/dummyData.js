import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/auth"}),
    endpoints:(builder)=>({
        signUpUser:builder.query({
            query:()=>
        })
    })
})