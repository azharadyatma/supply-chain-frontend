<template>
  <div class="order">
    <!--<h2 class="order-title">Order</h2>-->
    <div class="transaction-list">
      <div class="header">
        <h2>Order List</h2>
        <div class="search">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Stakeholder</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th class="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in paginatedItems" :key="transaction.kode">
              <td>{{ transaction.kode }}</td>
              <td>{{ transaction.namaKaryawan }}</td>
              <td>{{ transaction.namaBarang }}</td>
              <td>{{ transaction.jumlahPinjam }}</td>
              <td>{{ transaction.tanggalPinjam }}</td>
              <td>{{ transaction.tanggalKembali }}</td>
              <td>{{ transaction.status }}</td>
              <td class="action-buttons">
                <button class="verif-btn" @click="openModal(transaction)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  class="delete-btn"
                  @click="deleteTransaction(transaction.kode)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="page-navigation-table">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                @click.prevent="changePage(currentPage - 1)"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="changePage(currentPage + 1)"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <Modal :visible="isModalVisible" :title="'Edit Status'" @close="closeModal">
      <form @submit.prevent="updateStatus">
        <h3>Update Status</h3>
        <div class="status-dropdown">
          <select v-model="form.status" required>
            <option value="Pending">Pending</option>
            <option value="On Process">On Process</option>
            <option value="Done">Done</option>
            <option value="Reject">Reject</option>
          </select>
        </div>
        <div class="button-container">
          <button type="submit" class="btn-success">Update</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"; // Impor modal baru

export default {
  components: {
    Modal,
  },
  data() {
    return {
      transactions: [
        {
          kode: "2024001",
          namaKaryawan: "Budiono",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.9.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.6.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
        {
          kode: "2024001",
          namaKaryawan: "Budiono",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.9.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.6.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
        {
          kode: "2024001",
          namaKaryawan: "Budiono",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.9.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.6.000.000",
          tanggalKembali: "2024-8-17",
          status: "Pending",
        },
      ],
      isModalVisible: false,
      form: {
        kode: "",
        status: "",
      },
      currentPage: 1,
      transactionsPerPage: 5,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.transactions.length / this.transactionsPerPage);
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.transactionsPerPage;
      const end = start + this.transactionsPerPage;
      return this.transactions.slice(start, end);
    },
  },

  methods: {
    openModal(transaction) {
      if (this.form.kode !== transaction.kode) {
        this.form = { ...transaction };
        this.isModalVisible = true;
      }
    },

    closeModal() {
      this.isModalVisible = false;
      this.form = { kode: "", status: "" };
    },

    updateStatus() {
      const index = this.transactions.findIndex(
        (transaction) => transaction.kode === this.form.kode
      );
      if (index !== -1) {
        this.transactions[index].status = this.form.status;
      }
      this.closeModal();
    },

    deleteTransaction(kode) {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.kode !== kode
      );
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
.order {
  padding: 20px;
}

h3 {
  color: #736efe;
  font-weight: bold;
  margin: 20px;
  font-size: 32px;
}

.order-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
}

.transaction-list {
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #736efe;
  font-size: 24px;
  font-weight: 600;
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
  border-top: 0.5px solid #cbcbcb;
  border-bottom: 0.5px solid #cbcbcb;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
}

th {
  background-color: #736efe;
  color: white;
  font-size: 14px;
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

.btn-success {
  background-color: #736efe;
  border-color: #736efe;
  color: white;
  width: 120px;
  height: 40px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 20px;
}

.btn-success:hover {
  background-color: #615dd7;
  border-color: #615dd7;
}

.verif-btn:hover {
  background-color: #bca052;
}

.delete-btn:hover {
  background-color: #bb3232;
}

.icon {
  margin-right: 8px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.verif-btn {
  color: #fed86e;
  background-color: #fff4d5;
  border-radius: 10px;
  font-size: 14px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
}

.delete-btn {
  color: #fe6e70;
  background-color: #ffdfdf;
  border-radius: 10px;
  font-size: 14px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-dropdown {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.status-dropdown select {
  margin: 20px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  height: 40px;
}

.status-dropdown button {
  padding: 6px 12px;
  background-color: #736efe;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status-dropdown button:hover {
  background-color: #615dd7;
}

.pagination {
  justify-content: flex-end;
  margin-top: 20px;
}

.page-item {
  margin-left: 5px;
}

.page-link {
  color: #736efe;
  background-color: transparent;
  border: 1px solid #736efe;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600px;
  border-radius: 6px;
}

.page-link:hover {
  background-color: #615dd7;
  color: white;
}

.page-item.active .page-link {
  background-color: #736efe;
  color: white;
  border: 1px solid #736efe;
}

.page-item.disabled .page-link {
  color: #cbcbcb;
  border: 1px solid #cbcbcb;
}

.search {
  width: 50%;
}

.search input::placeholder {
  font-size: 14px;
  color: #cbcbcb;
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
