import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usuario: null,
  },
  reducers: {
    iniciarSesion: (state, action) => {
      state.usuario = action.payload;
      console.log('Usuario inició sesión:', action.payload);
    },
    cerrarSesion: (state) => {
      state.usuario = null;
    },
  },
});

export const { iniciarSesion, cerrarSesion } = userSlice.actions;

export default userSlice.reducer;
