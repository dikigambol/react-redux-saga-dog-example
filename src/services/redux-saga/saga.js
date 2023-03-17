import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// saga pengamat: mengawasi tindakan yang dikirim ke toko, memulai saga pekerja
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// fungsi yang membuat permintaan api dan mengembalikan Promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// saga pekerja: membuat panggilan api ketika saga pengamat melihat aksinya
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // kirim tindakan sukses ke toko dengan anjing baru
    yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // mengirim tindakan kegagalan ke toko dengan kesalahan
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

// Sebelum kita menelusuri file baru ini, perhatikan sintaks function*. 
// Ini menciptakan jenis fungsi khusus yang baru di ES6 yang disebut generator.

// Generator dapat menjeda dan memulai kembali — keluar dan masuk kembali — 
// dan benar-benar mengingat konteks/status fungsi dari waktu ke waktu.

// Setiap hasil dalam generator pada dasarnya mewakili langkah asinkron dalam 
// proses yang lebih sinkron/sekuensial — seperti menunggu dalam fungsi async.

// redux-saga bergantung pada generator, tetapi melakukan pekerjaan yang layak bagi kami, 
// jadi (dalam pengalaman saya yang cukup terbatas) pemahaman yang mendalam tentang 
// mereka untuk kasus penggunaan ini tidak diperlukan.

// ============================================================================================

// 1. a watcherSaga adalah saga yang mengawasi tindakan yang akan dikirim ke Store, memicu saga pekerja.

// 2. takeLatest adalah fungsi pembantu yang disediakan oleh redux-saga yang akan memicu workerSaga baru 
// saat melihat API_CALL_REQUEST, sambil membatalkan semua workerSaga yang dipicu sebelumnya masih dalam proses.

// 3. fetchDog cukup menggunakan axios untuk meminta gambar anjing acak dari Dog API dan mengembalikan Promise untuk responsnya.

// 4. workerSaga mencoba mengambilDog, menggunakan panggilan fungsi pembantu redux-saga lainnya, 
// dan menyimpan hasilnya (Janji yang diselesaikan atau gagal) dalam variabel respons.

// 5. Jika fetchDog berhasil, kami mengekstrak gambar anjing dari respons dan mengirimkan tindakan 
// API_CALL_SUCCESS dengan anjing di payload ke Store, menggunakan penempatan fungsi pembantu redux-saga LAINNYA.

// 6. Jika ada kesalahan dengan fetchDog, kami memberi tahu Store tentang hal itu dengan mengirimkan 
// tindakan API_CALL_FAILURE dengan kesalahan tersebut.