<template>
  <div class="order">
    <h2 class="order-title">Order</h2>
    <div class="transaction-list">
      <div class="header">
        <h2>Daftar Transaksi</h2>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Karyawan</th>
              <th>Nama Barang</th>
              <th>Jumlah Pinjam</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.kode">
              <td>{{ transaction.kode }}</td>
              <td>{{ transaction.namaKaryawan }}</td>
              <td>{{ transaction.namaBarang }}</td>
              <td>{{ transaction.jumlahPinjam }}</td>
              <td>{{ transaction.tanggalPinjam }}</td>
              <td>{{ transaction.tanggalKembali }}</td>
              <td>{{ transaction.status }}</td>

              <td class="action-buttons">
                <button
                  class="verif-btn"
                  @click="verifikasi(transaction)"
                  :disabled="transaction.status === 'Returned'"
                >
                  {{
                    transaction.status === "Returned"
                      ? "Returned"
                      : "Verifikasi"
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        {
          kode: "2024001",
          namaKaryawan: "Budiono",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-8-10",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },

        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-8-10",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },
      ],
    };
  },
  methods: {
    verifikasi(transaction) {
      if (transaction.status === "Borrowed") {
        transaction.status = "Returned";
      }
    },
  },
};
</script>

<style scoped>
.order {
  padding: 20px;
}

.order-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
}

.transaction-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

h2 {
  color: #736efe;
  font-size: 24px;
}

.add-btn {
  background-color: #736efe;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #615dd7;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 0.5px solid #cbcbcb;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
}

th {
  background-color: #736efe;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #cbcbcb;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.verif-btn {
  background-color: #3564c8;
  color: white;
}

.verif-btn:hover {
  background-color: #235485;
}

.verif-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons button {
    margin: 5px 0;
  }
}
</style>
