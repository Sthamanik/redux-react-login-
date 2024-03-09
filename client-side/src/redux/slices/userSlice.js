import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
    '/signup',
    async(user) => {
        const {name, email, password} = user;
        const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },body: JSON.stringify({name , email, password})
          });
          const json = await response.json();
          localStorage.setItem('token', json.authtoken) 
          return response;
    }
);

export const loginUser = createAsyncThunk(
    '/login',
    async(user) => {
        const {email, password} = user;
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },body: JSON.stringify({email: email, password: password})
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token', json.authtoken) 
          }
          return response
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
        // .................login............
        .addCase(loginUser.pending, (state)=> {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, ( state, action)=> {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state,action)=> {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 400'){
                state.error = 'Access denied! invalid credentials'
            }else{
                state.error = action.error.message;
            }
            state.error = null;
        })

        // ...................signup......................
        .addCase(signUpUser.pending, (state)=> {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(signUpUser.fulfilled, ( state, action)=> {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(signUpUser.rejected, (state,action)=> {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 400'){
                state.error = 'Access denied! invalid credentials'
            }else{
                state.error = action.error.message;
            }
            state.error = null;
        })
    }
})

export default userSlice.reducer;