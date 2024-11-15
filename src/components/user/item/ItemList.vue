<template>
  <div class="product">
    <h2 class="product-title">Product</h2>
    <div class="item-list">
      <div class="header">
        <h2>Daftar Barang</h2>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Deskripsi</th>
              <th>Stok</th>

              <th class="action-column">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in filteredItems" :key="item.kode">
              <td>{{ item.kode }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>{{ item.stok }}</td>

              <td class="action-buttons">
                <button class="borrow-btn" @click="borrowItem(item)">
                  Pinjam
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal :visible="showForm" @close="cancelBorrowForm">
        <ItemForm
          :item="selectedItem"
          @submit="handleBorrow"
          @cancel="cancelBorrowForm"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/user/item/ItemForm.vue";
import { EventBus } from "@/utils/EventBus";

export default {
  components: {
    Modal,
    ItemForm,
  },

  data() {
    return {
      items: [
        {
          kode: "2024001",
          nama: "Acer Nitro 15 AN515-58",
          deskripsi: "Intel Core i5 12500H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
          stok: 80,
        },

        {
          kode: "2024002",
          nama: "Lenovo LOQ 15 15IRH8",
          deskripsi: "Intel Core i5 13450H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
          stok: 80,
        },
      ],

      showForm: false,
      selectedItem: null,
      searchQuery: "",
    };
  },

  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter((item) =>
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return this.items;
    },
  },

  methods: {
    borrowItem(item) {
      this.selectedItem = { ...item };
      this.showForm = true;
    },

    handleBorrow(item) {
      console.log("Borrow item:", item);
      this.showForm = false;
    },

    cancelBorrowForm() {
      this.showForm = false;
      this.selectedItem = null;
    },

    handleSearch(query) {
      this.searchQuery = query;
    },
  },

  mounted() {
    EventBus.on("search", this.handleSearch);
  },

  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>

<style scoped>
.product {
  padding: 20px;
}

.product-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
}

.item-list {
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

.borrow-btn {
  background-color: #3564c8;
  color: white;
}

.borrow-btn:hover {
  background-color: #235485;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
