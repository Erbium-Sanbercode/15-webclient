const initialState = [];

function write(state, action) {
   state.push({ 
      id       : action.payload.id,
      nama     : action.payload.nama,
      email    : action.payload.email,
      telepon  : action.payload.telepon,
      alamat   : action.payload.alamat,
      foto     : action.payload.foto,
      biografi : action.payload.biografi,
   });
   return state;
}

function read(state, action) {
   state = action.payload;
   return state;
}

module.exports = {
   initialState,
   write,
   read
}