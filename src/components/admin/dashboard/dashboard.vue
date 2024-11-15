<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="card-container">
      <div class="card">
        <h3>Product Stock</h3>
        <div class="card-content">
          <p>{{ productStock }}</p>
          <i class="fa-solid fa-box-open icon product-icon"></i>
        </div>
      </div>
      <div class="card">
        <h3>Total Orders</h3>
        <div class="card-content">
          <p>{{ totalOrders }}</p>
          <i class="fas fa-cart-shopping icon order-icon"></i>
        </div>
      </div>
      <div class="card">
        <h3>Completed Orders</h3>
        <div class="card-content">
          <p>{{ completedOrders }}</p>
          <i class="fa-solid fa-clipboard-check icon completed-icon"></i>
        </div>
      </div>
      <div class="card">
        <h3>Pending Orders</h3>
        <div class="card-content">
          <p>{{ pendingOrders }}</p>
          <i class="fa-solid fa-hourglass-half icon pending-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productStock: 100, // Ganti dengan data nyata
      totalOrders: 250, // Ganti dengan data nyata
      completedOrders: 200, // Ganti dengan data nyata
      pendingOrders: 50, // Ganti dengan data nyata
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-container {
  display: flex;
  justify-content: space-between; /* Mengatur jarak antar card */
}

h2 {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
}

h3 {
  font-size: 14px;
  color: #cbcbcb;
}

.card-content {
  display: flex;
  align-items: center; /* Mengatur agar teks dan ikon berada sejajar */
  justify-content: space-between; /* Mengatur agar teks dan ikon berada di ujung yang berlawanan */
  flex: 1; /* Membuat konten mengambil seluruh lebar yang tersedia */
}

p {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
  margin-right: 10px; /* Jarak antara angka dan ikon */
  margin-bottom: 0;
}

.card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  flex: 1;
  text-align: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Efek hover */
}

.icon {
  font-size: 20px; /* Ukuran ikon */
  color: #ffffff; /* Warna ikon, bisa disesuaikan */
  border-radius: 20px; /* Membuat ikon berbentuk lingkaran */
  padding: 20px; /* Jarak dalam ikon */
  width: 50px; /* Ukuran latar belakang ikon */
  height: 50px; /* Ukuran latar belakang ikon */
  display: flex; /* Mengatur ikon menjadi fleksibel */
  align-items: center; /* Menyelaraskan ikon di tengah */
  justify-content: center; /* Menyelaraskan ikon di tengah */
}

.product-icon {
  color: #77a4ff;
  background-color: #dfeaff;
}

.order-icon {
  color: #fed86e;
  background-color: #fff4d5;
}

.completed-icon {
  color: #63d18b;
  background-color: #d5ffe2;
}

.pending-icon {
  color: #fe6e70;
  background-color: #ffdfdf;
}
</style>
