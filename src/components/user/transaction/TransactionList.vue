<template>
  <div class="order">
    <!--<h2 class="order-title">Order</h2>-->
    <div class="order-list">
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
        <!-- <button class="add-btn" @click="goToOrderForm">
          <i class="fa-solid fa-plus icon"></i> New Order
        </button> -->
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th class="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>{{ order.order_id }}</td>
              <td>{{ order.Master_Data?.product_name }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.total?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</td>
              <td>{{ order.created_at?.split('T')[0] }}</td>
              <td>{{ order.status }}</td>
              <td class="action-buttons">
                <button
                  :disabled="order.status !== 'REJECT'"
                  :class="order.status == 'REJECT' ? update-btn : 'bg-secondary-hustle'"
                  @click="openModal(order)"
                >
                <i class="fa-solid fa-pen-to-square"></i>
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
      <TransactionForm :products="products" :order="order" :form="form" @close="closeModal" @submit-form="updateOrder" />
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"; // Impor modal baru
import TransactionForm from "./TransactionForm.vue";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import eventBus from "@/utils/EventBus";
import { useOrderStore } from "@/store/orderStore";
import { useProductStore } from "@/store/itemStore";

export default {
  components: {
    Modal,
    TransactionForm
  },

  setup() {
    let authStore = useAuthStore();
    let orderStore = useOrderStore();
    let productStore = useProductStore()
    let orders = computed(() => orderStore.orders);
    let products = computed(() => productStore.products)

    onMounted(() => {
      if (authStore.token) {
        orderStore.fetchOrders();
        productStore.fetchProducts();
      } else {
        console.error("Orders is not authenticated");
      }
    });

    return {
      orders,
      orderStore,
      products,
      productStore
    };
  },

  data() {
    return {
      isModalVisible: false,
      currentPage: 1,
      ordersPerPage: 5,
      form: {},
      order: {}
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.orders.length / this.ordersPerPage);
    },

    paginatedOrders() {
      const start = (this.currentPage - 1) * this.ordersPerPage;
      const end = start + this.ordersPerPage;
      return this.orders.slice(start, end);
    },
  },

  methods: {
    openModal(order) {
      this.form = { ...order };
      this.order = order
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.form = { id: "", status: "" };
    },

    // updateStatus() {
    //   const index = this.orders.findIndex(
    //     (order) => order.id === this.form.id
    //   );
    //   if (index !== -1) {
    //     this.orders[index].status = this.form.status;
    //   }
    //   this.closeModal();
    // },
    
    async updateOrder(order) {
      await this.orderStore.switchOrder(order)
      await this.orderStore.fetchOrders()
      this.closeModal();
    },

    // goToOrderForm() {
    //   this.$router.push("/transactions/new");
    // },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  unmounted() {
    eventBus.on("search", this.handleSearch);
  },

  beforeUnmount() {
    eventBus.off("search", this.handleSearch);
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

.order-list {
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
  margin-right: 350px;
}

.search {
  flex: 1;
  width: 100%;
  margin-right: 10px;
}

.search input::placeholder {
  font-size: 14px;
  color: #cbcbcb;
}

.add-btn {
  background-color: #736efe;
  color: white;
  padding: 10px 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
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

.update-btn:hover {
  background-color: #bca052;
}

.icon {
  margin-right: 8px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-btn {
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
