<template>
  <div class="history">
    <h2 class="history-title">History</h2>
    <div class="history-list">
      <div class="header">
        <h2>Riwayat Peminjaman</h2>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Barang</th>
              <th>Jumlah Pinjam</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="history in histories" :key="history.id">
              <td>{{ history.id }}</td>
              <td>{{ history.namaBarang }}</td>
              <td>{{ history.jumlahPinjam }}</td>
              <td>{{ history.tanggalPinjam }}</td>
              <td>{{ history.tanggalKembali }}</td>

              <td :class="['status', history.status.toLowerCase()]">
                {{ history.status }}
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
  name: "HistoryList",

  data() {
    return {
      histories: [
        {
          id: 1,
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2023-05-01",
          tanggalKembali: "2023-05-10",
          status: "selesai",
        },

        {
          id: 2,
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 2,
          tanggalPinjam: "2023-06-15",
          tanggalKembali: "2023-06-20",
          status: "diproses",
        },
      ],
    };
  },
};
</script>

<style scoped>
.history {
  padding: 20px;
}

.history-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
}

.history-list {
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #cbcbcb;
  padding: 12px 15px;
  text-align: center;
  font-size: 14px;
}

th {
  background-color: #736efe;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #cbcbcb;
}

.status {
  text-transform: capitalize;
  font-weight: bold;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
}

.status.diproses {
  color: #fed86e;
}

.status.selesai {
  color: #35c88d;
}
</style>
