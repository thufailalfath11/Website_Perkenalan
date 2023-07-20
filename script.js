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

  // Daftar pengguna (username dan password)
  const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' }
  ];

  var foundUser = users.find(user => user.username === username && user.password === password);
  if (foundUser) {
      alert("Login berhasil!");
      // Redirect ke halaman "index.html" setelah login berhasil
      window.location.href = "index.html";
  } else {
      alert("Login gagal! Periksa kembali username dan password Anda.");
  }
}
// Array untuk menyimpan daftar produk
const products = [];

function addProduct(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('description').value;
    var image = document.getElementById('image').files[0];

    // Validasi input
    if (!name || !price || isNaN(price) || !description || !image) {
        alert("Silakan lengkapi semua field dengan benar.");
        return;
    }

    // Buat URL untuk preview gambar
    var imageUrl = URL.createObjectURL(image);

    // Tambahkan produk ke dalam array produk
    products.push({ name, price, description, imageUrl });

    // Tampilkan daftar produk
    displayProducts();

    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';
}

function displayProducts() {
    var productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        var productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: ${product.price}</p>
            <p>${product.description}</p>
            <img src="${product.imageUrl}" alt="${product.name}">
        `;
        productList.appendChild(productDiv);
    });
}
function viewProduct(index) {
  var product = products[index];
  var queryString = `name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&description=${encodeURIComponent(product.description)}&imageUrl=${encodeURIComponent(product.imageUrl)}`;
  var url = `produk.html?${queryString}`;
  window.location.href = url;
}
window.onload = function () {
  // Ambil data produk dari URL parameter
  var urlParams = new URLSearchParams(window.location.search);
  var productName = urlParams.get('name');
  var productPrice = urlParams.get('price');
  var productDescription = urlParams.get('description');
  var productImageUrl = urlParams.get('imageUrl');

  // Tampilkan detail produk
  document.getElementById('product-name').innerText = productName;
  document.getElementById('product-price').innerText = "Harga: " + productPrice;
  document.getElementById('product-description').innerText = productDescription;
  document.getElementById('product-image').src = productImageUrl;
};

function tambahProduk() {
  window.location.href = "tambahproduk.html";
}

