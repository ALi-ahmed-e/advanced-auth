import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth" ,credentials: 'include'}),
    endpoints: (builder) => ({

        signUpUser: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'post',
                body: data
            }),

        }),

        VerfiyUserEmail: builder.mutation({
            query: (data) => ({
                url: '/verifiy-email',
                method: 'post',
                body: data
            }),

        }),
        LoginUser: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'post',
                body: data,

            }),

        }),
        CheckAuth: builder.query({
            query: () => ({
                url: '/check-auth',
                method: 'get',
            }),

        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'post',
            }),

        }),



    })
})

export const { useSignUpUserMutation,useLoginUserMutation,useVerfiyUserEmailMutation,useCheckAuthQuery,useLogoutMutation } = authApi