<template>
  <div class="product">
    <h2 class="product-title">Product</h2>
    <div class="item-list">
      <div class="header">
        <h2>Daftar Barang</h2>
        <button class="add-btn" @click="showAddForm">
          <i class="fa-solid fa-plus icon"></i>Tambah Barang
        </button>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Barang</th>
              <th>Deskripsi</th>
              <th>Stok</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.kode">
              <td>{{ item.kode }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>{{ item.stok }}</td>
              <td class="action-buttons">
                <button class="edit-btn" @click="editItem(item)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" @click="deleteItem(item.kode)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <Modal :visible="showForm" @close="cancelEditForm">
          <ItemForm
            :item="selectedItem"
            :isEdit="isEdit"
            @submit="handleSubmit"
            @cancel="cancelEditForm"
          />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import { EventBus } from "@/utils/EventBus";
import { useItemStore } from "@/store/item.store";

export default {
  components: {
    Modal,
    ItemForm,
  },
  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
      searchQuery: "",
    };
  },
  computed: {
    items() {
      return this.itemStore.items;
    },
    filteredItems() {
      return this.items.filter((item) =>
        item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    showAddForm() {
      this.selectedItem = {
        kode: "",
        nama: "",
        deskripsi: "",
        stok: 0,
      };
      this.isEdit = false;
      this.showForm = true;
    },
    editItem(item) {
      this.selectedItem = { ...item };
      this.isEdit = true;
      this.showForm = true;
    },
    handleSubmit(item) {
      if (this.validateItem(item)) {
        if (this.isEdit) {
          this.itemStore.updateItem(item);
        } else {
          this.itemStore.addItem(item);
        }
        this.showForm = false;
      }
    },
    validateItem(item) {
      return (
        item.kode &&
        item.nama &&
        item.deskripsi &&
        item.stok !== null &&
        !isNaN(item.stok)
      );
    },
    cancelEditForm() {
      this.showForm = false;
    },
    deleteItem(kode) {
      this.itemStore.deleteItem(kode);
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
  setup() {
    const itemStore = useItemStore();
    return { itemStore };
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

.add-btn {
  background-color: #736efe;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
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
  border-radius: 6px;
  font-size: 14px;
}

.edit-btn:hover {
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

.edit-btn {
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
