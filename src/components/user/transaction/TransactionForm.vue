<template>
  <div class="transaction-form">
    <form @submit.prevent="submitForm">
      <h2>Pengembalian Barang</h2>

      <div>
        <label for="kode">Kode Barang:</label>

        <input type="text" v-model="form.kode" id="kode" :disabled="true" />
      </div>

      <div>
        <label for="nama">Nama Produk:</label>

        <input type="text" v-model="form.nama" id="nama" :disabled="true" />
      </div>

      <div>
        <label for="tanggal_pinjam">Tanggal Pinjam:</label>

        <input
          type="date"
          v-model="form.tanggal_pinjam"
          id="tanggal_pinjam"
          :disabled="true"
        />
      </div>

      <div>
        <label for="tanggal_kembali">Tanggal Kembali:</label>

        <input
          type="date"
          v-model="form.tanggal_kembali"
          id="tanggal_kembali"
        />
      </div>

      <div>
        <label for="jumlah_pinjam">Jumlah Pinjam:</label>

        <input
          type="number"
          v-model="form.jumlah_pinjam"
          id="jumlah_pinjam"
          :disabled="true"
        />
      </div>

      <div class="button-container">
        <button type="button" @click="cancelForm">Batal</button>

        <button type="submit">Ajukan</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    transaction: Object,
  },

  data() {
    return {
      form: {
        kode: this.transaction ? this.transaction.kode : "",

        nama: this.transaction ? this.transaction.namaBarang : "",

        tanggal_pinjam: this.transaction ? this.transaction.tanggalPinjam : "",

        tanggal_kembali: "",

        jumlah_pinjam: this.transaction ? this.transaction.jumlahPinjam : 1,
      },
    };
  },

  methods: {
    submitForm() {
      this.$emit("submit", { ...this.form });
    },

    cancelForm() {
      this.$emit("cancel");
    },
  },

  watch: {
    transaction(newTransaction) {
      if (newTransaction) {
        this.form.kode = newTransaction.kode;

        this.form.nama = newTransaction.namaBarang;

        this.form.tanggal_pinjam = newTransaction.tanggalPinjam;

        this.form.jumlah_pinjam = newTransaction.jumlahPinjam;
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;

  flex-direction: column;

  width: 100%;

  max-width: 400px;

  margin: auto;

  background: #f0f0f0;

  padding: 20px;

  border-radius: 8px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;

  margin-bottom: 20px;
}

label {
  margin-top: 10px;
}

input {
  padding: 5px;

  margin-top: 5px;
}

.button-container {
  display: flex;

  justify-content: space-between;

  margin-top: 20px;
}

button {
  background-color: #4caf50;

  color: white;

  border: none;

  padding: 10px;

  cursor: pointer;

  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
}

button[type="button"]:hover {
  background-color: #e31b0c;
}
</style>
