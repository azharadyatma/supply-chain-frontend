<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="card-container">
      <div class="card">
        <h3>Product Stock</h3>
        <div class="card-content">
          <p>{{ totalStock }}</p>
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

    <div class="chart-date-container">
      <div class="card">
        <h3>Sales Data Chart</h3>

        <BarChart />
      </div>
      <div class="datepicker-wrapper">
        <h3>Calendar</h3>
        <DatePicker />
      </div>
    </div>
    <TransactionList />
  </div>
</template>

<script>
import BarChart from "@/components/admin/dashboard/BarChart.vue";
import DatePicker from "@/components/admin/dashboard/Calendar.vue";
import TransactionList from "@/components/admin/transaction/TransactionList.vue";
import { computed, onMounted } from "vue";
import { useProductStore } from "@/store/itemStore";
import { useOrderStore } from "@/store/orderStore";

export default {
  components: {
    BarChart,
    DatePicker,
    TransactionList,
  },

  setup() {
    const productStore = useProductStore();
    const orderStore = useOrderStore();

    const products = computed(() => productStore.products);
    const orders = computed(() => orderStore.orders);

    const totalStock = computed(() =>
      products.value.reduce((sum, product) => {
        const quantity = product.Quantity?.[0]?.quantity_of_product || 0;
        return sum + quantity;
      }, 0)
    );

    const totalOrders = computed(() => orders.value.length);

    const completedOrders = computed(
      () => orders.value.filter((order) => order.status === "DONE").length
    );

    const pendingOrders = computed(
      () => orders.value.filter((order) => order.status === "PENDING").length
    );

    onMounted(() => {
      productStore.fetchProductsByUserId();
      orderStore.fetchOrdersByUserId(); // Pastikan pesanan telah di-fetch
    });

    return {
      products,
      orders,
      totalStock,
      totalOrders,
      completedOrders,
      pendingOrders,
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
  justify-content: space-between;
  padding: 10px;
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
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

p {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
  margin-right: 10px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 20px;
  color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #f79c42;
  background-color: #ffddba;
}

.chart-date-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
}

.datepicker-wrapper {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  padding-bottom: 150px;
  margin: 10px;
  width: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.datepicker-wrapper:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
