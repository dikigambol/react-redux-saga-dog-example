// action types

// API_CALL_REQUEST menyatakan bahwa kami sedang memulai proses pengambilan anjing dari API Anjing.
const API_CALL_REQUEST = "API_CALL_REQUEST";
// API_CALL_SUCCESS memberi tahu Store bahwa kami berhasil mengambil seekor anjing dan karenanya tidak lagi dalam proses mengambilnya.
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
// API_CALL_FAILURE memberi tahu Store bahwa ada yang tidak beres dengan panggilan API kami. Kami menerima kesalahan daripada anjing baru.
const API_CALL_FAILURE = "API_CALL_FAILURE";

// reducer with initial state
const initialState = {
  fetching: false,
  dog: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, dog: action.dog };
    case API_CALL_FAILURE:
      return { ...state, fetching: false, dog: null, error: action.error };
    default:
      return state;
  }
}

// Kami ingin membuat saga, menggunakan redux-saga, yang akan memulai panggilan API untuk gambar anjing, 
// lalu memberi tahu Store apakah panggilan API itu berhasil atau gagal.

// Jika berhasil, kami akan mendapatkan anjing baru dan mengirimkan API_CALL_SUCCESS bersama dengan anjing tersebut.
// Jika gagal, kami akan mendapatkan kesalahan dan mengirimkan API_CALL_FAILURE bersama dengan kesalahan tersebut.