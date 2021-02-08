require("./css/worker.css");

// third party
const { interval, fromEvent, merge } = require("rxjs");
const { tap, map, filter, delay, throttleTime } = require("rxjs/operators");

// 
const { store$, readAction } = require("./js/store");
const {
    createWorkerAsync,
    readWorkerAsync
} = require("./js/workers-client");


// container
const form_registrasi = document.getElementsByClassName("form-registrasi")[0];
const table_worker = document.getElementsByClassName("table-worker")[0];

// table
const table = document.getElementById("table");
const tbody = table.getElementsByTagName("tbody")[0];

// button
const btn_simpan = document.getElementById("btn_simpan");
const btn_registrasi = document.getElementById("btn_registrasi");
const btn_daftar_pekerja = document.getElementById("btn_daftar_pekerja");

// text input
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const telepon = document.getElementById("telepon");
const alamat = document.getElementById("alamat");

// file input
const foto = document.getElementById("foto");

// textarea input
const biografi = document.getElementById("biografi");


// button click listener
const btn_simpan$ = fromEvent(btn_simpan, 'click');
const btn_registrasi$ = fromEvent(btn_registrasi, 'click');
const btn_daftar_pekerja$ = fromEvent(btn_daftar_pekerja, 'click');

// button click streamer
const btn_simpan_clicked$ = btn_simpan$.pipe();
const btn_registrasi_clicked$ = btn_registrasi$.pipe(
    tap(() => {
        table_worker.classList.add('hidden');
        btn_registrasi.classList.add('active');
        form_registrasi.classList.remove('hidden');
        btn_daftar_pekerja.classList.remove('active');
    })
);
const btn_daftar_pekerja_clicked$ = btn_daftar_pekerja$.pipe(
    tap(() => {
        btn_registrasi.classList.remove('active');
        table_worker.classList.remove('hidden');
        btn_daftar_pekerja.classList.add('active');
        form_registrasi.classList.add('hidden');
    })
)

// button subscribe
btn_simpan_clicked$.subscribe(e => {
    e.preventDefault();
    let form = {
        nama: nama.value,
        email: email.value,
        telepon: telepon.value,
        alamat: alamat.value,
        foto: foto.value,
        biografi: biografi.value
    }
    console.log(form);
});

btn_registrasi_clicked$.subscribe();
btn_daftar_pekerja_clicked$.subscribe(() => {
    store$.dispatch(readWorkerAsync)
});


store$.subscribe(() => {
    const state = store$.getState();    
    render(state);
});


function render(state) {
    tbody.innerHTML = '';
    for (const iterator of state) {        
        const row = tbody.insertRow(-1);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);        

        cell1.innerHTML = iterator.id;
        cell2.innerHTML = iterator.nama;
        cell3.innerHTML = iterator.email;
        cell4.innerHTML = iterator.telepon;
        cell5.innerHTML = iterator.alamat;
        cell6.innerHTML = iterator.biografi;
        cell7.innerHTML = iterator.foto;
    }    
}
