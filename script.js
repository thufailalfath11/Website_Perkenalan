let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function tambahKeKeranjang(namaProduk, gambarProduk) {
  keranjang.push({ nama: namaProduk, gambar: gambarProduk });
  console.log(keranjang);
  alert("Produk berhasil ditambahkan ke keranjang!");
  // Simpan keranjang ke localStorage
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  // Redirect ke halaman checkout
  window.location.href = "checkout.html";
}

function konfirmasiHapusKeranjang() {
  let konfirmasi = confirm("Apakah Anda yakin ingin menghapus keranjang?");
  if (konfirmasi) {
    hapusKeranjang();
  }
}

function hapusKeranjang() {
  keranjang = [];
  alert("Keranjang telah kosong!");
  localStorage.removeItem("keranjang");
  tampilkanCheckout();
}
function konfirmasiHapusProduk() {
  let konfirmasi = confirm("Apakah Anda yakin ingin menghapus Produk?");
  if (konfirmasi) {
    hapusProduk();
  }
}
function hapusProduk(index) {
  keranjang.splice(index, 1);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  tampilkanCheckout();
}

function tampilkanCheckout() {
  let daftarProduk = document.getElementById("daftar-produk");
  let totalHargaElem = document.getElementById("total-harga");
  let totalHarga = 0;

  // Menghapus elemen sebelumnya
  while (daftarProduk.firstChild) {
    daftarProduk.removeChild(daftarProduk.firstChild);
  }

  for (let i = 0; i < keranjang.length; i++) {
    let produk = document.createElement("li");

    let gambar = document.createElement("img");
    gambar.src = keranjang[i].gambar;
    gambar.alt = keranjang[i].nama;
    gambar.width = 100;
    produk.appendChild(gambar);

    let namaProduk = document.createElement("h4");
    namaProduk.textContent = keranjang[i].nama;
    produk.appendChild(namaProduk);

    let hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.onclick = function () {
      hapusProduk(i);
    };
    produk.appendChild(hapusButton);

    daftarProduk.appendChild(produk);

    // Menghitung total harga
    totalHarga += 100000; // Harga produk per item (misalnya: Rp. 100.000)
  }

  totalHargaElem.textContent = totalHarga.toLocaleString();
}
function toggleDeskripsi(deskripsiId) {
  let deskripsi = document.getElementById(deskripsiId);
  let deskripsiText = deskripsi.textContent.trim();
  alert(deskripsiText);
}

/*
function toggleDeskripsi(deskripsiId) {
    let deskripsi = document.getElementById(deskripsiId);
    if (deskripsi.style.display === "none") {
      deskripsi.style.display = "block";
    } else {
      deskripsi.style.display = "none";
    }
  } 

*/
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Anda bisa mengganti URL ini dengan URL ke backend server Anda
  var url = 'users.json';

  // Menggunakan fetch API untuk mengambil data dari "users.json"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var users = data.users;
      var foundUser = users.find(user => user.username === username && user.password === password);
      if (foundUser) {
        alert("Login berhasil!");
        window.location.href= 'index.html';
        // Di sini Anda bisa melakukan redirect ke halaman selanjutnya atau memberikan akses ke konten tertentu.
      } else {
        alert("Login gagal! Periksa kembali username dan password Anda.");
      }
    })
    .catch(error => {
      alert("Terjadi kesalahan saat memproses data.");
      console.error(error);
    });
}
