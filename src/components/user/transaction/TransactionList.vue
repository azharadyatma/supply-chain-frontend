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
              <th>Nama User</th>
              <th>Nama Barang</th>
              <th>Jumlah Pinjam</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Pengembalian</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.namaUser }}</td>
              <td>{{ transaction.namaBarang }}</td>
              <td>{{ transaction.jumlahPinjam }}</td>
              <td>{{ transaction.tanggalPinjam }}</td>
              <td>{{ transaction.tanggalPengembalian }}</td>
              <td>{{ transaction.status }}</td>

              <td class="action-buttons">
                <button
                  class="return-btn"
                  @click="openReturnForm(transaction)"
                  :disabled="transaction.status === 'Returned'"
                >
                  {{
                    transaction.status === "Returned"
                      ? "Dikembalikan"
                      : "Kembalikan"
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal :visible="showForm" @close="cancelReturnForm">
        <TransactionForm
          :transaction="selectedTransaction"
          @submit="handleReturn"
          @cancel="cancelReturnForm"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TransactionForm from "@/components/user/transaction/TransactionForm.vue";

export default {
  components: {
    Modal,
    TransactionForm,
  },

  data() {
    return {
      transactions: [
        {
          id: "2024001",
          namaUser: "John Doe",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2022-10-10",
          tanggalPengembalian: "2022-10-17",
          status: "Borrowed",
        },

        {
          id: "2024002",
          namaUser: "Jane Smith",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "2022-10-10",
          tanggalPengembalian: "2022-10-17",
          status: "Borrowed",
        },
      ],

      showForm: false,
      selectedTransaction: null,
    };
  },

  methods: {
    openReturnForm(transaction) {
      this.selectedTransaction = { ...transaction };
      this.showForm = true;
    },

    handleReturn(updatedTransaction) {
      const index = this.transactions.findIndex(
        (t) => t.id === updatedTransaction.id
      );

      if (index !== -1) {
        this.transactions[index] = {
          ...updatedTransaction,
          status: "Returned",
        };
      }

      this.cancelReturnForm();
    },

    cancelReturnForm() {
      this.showForm = false;
      this.selectedTransaction = null;
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

.return-btn {
  background-color: #3564c8;
  color: white;
}

.return-btn:hover {
  background-color: #235485;
}

.return-btn[disabled] {
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
