<template>
  <div class="label">
    <!--<h2 class="label-title">Label</h2>-->
    <div class="label-container">
      <div class="header">
        <h2>Label List</h2>
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
          <tr v-for="transaction in transactions" :key="transaction.kode">
            <td>{{ transaction.kode }}</td>
            <td>{{ transaction.namaKaryawan }}</td>
            <td>{{ transaction.namaBarang }}</td>
            <td>{{ transaction.jumlahPinjam }}</td>
            <td>{{ transaction.tanggalPinjam }}</td>
            <td>{{ transaction.tanggalKembali }}</td>
            <td>{{ transaction.status }}</td>
            <td>
              <button class="verif-btn" @click="openModal(transaction)">
                <i class="fa-solid fa-print"></i>
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

    <Modal :visible="isModalVisible" @close="closeModal">
      <LabelOrder :order="selectedOrder" :isCompact="true" />
      <div class="button-container">
        <button type="submit" class="btn-success">Print</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import LabelOrder from "@/components/admin/label/LabelOrder.vue";

export default {
  components: {
    Modal,
    LabelOrder,
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
          status: "Borrowed",
        },
        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "Rp.6.000.000",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },
      ],
      selectedOrder: null,
      isModalVisible: false,
      currentPage: 1,
      labelPerPage: 5,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.transactions.length / this.labelPerPage);
    },

    paginatedItems() {
      const start = (this.currentPage - 1) * this.labelPerPage;
      const end = start + this.labelPerPage;
      return this.transactions.slice(start, end);
    },
  },

  methods: {
    openModal(transaction) {
      this.selectedOrder = transaction;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedOrder = null;
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
.label {
  padding: 20px;
}

.label-container,
.label-order {
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.label-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
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

.search {
  width: 50%;
}

.search input::placeholder {
  font-size: 14px;
  color: #cbcbcb;
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

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 20px;
}

.btn-success {
  background-color: #736efe;
  border-color: #736efe;
  color: white;
  width: 120px;
  height: 40px;
}

.btn-success:hover {
  background-color: #615dd7;
  border-color: #615dd7;
}

.verif-btn {
  color: #77a4ff;
  background-color: #dfeaff;
  border-radius: 10px;
  font-size: 14px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.verif-btn:hover {
  background-color: #6389d6;
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

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .verif-btn {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>
