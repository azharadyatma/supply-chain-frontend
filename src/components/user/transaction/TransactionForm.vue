<template>
  <div class="order-form">
    <h2 class="order-form-title">Form Order Stakeholder</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="orderNo">Order No</label>
        <input type="text" id="orderNo" v-model="order.orderNo" required />
      </div>

      <div class="form-group">
        <label for="stakeholderName">Nama Stakeholder</label>
        <input
          type="text"
          id="stakeholderName"
          v-model="order.stakeholderName"
          required
        />
      </div>

      <div class="form-group">
        <label for="product">Product</label>
        <input type="text" id="product" v-model="order.product" required />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" v-model="order.quantity" required />
      </div>

      <div class="form-group">
        <label for="totalPrice">Total Harga</label>
        <input
          type="number"
          id="totalPrice"
          v-model="order.totalPrice"
          required
        />
      </div>

      <button type="submit" class="btn-submit">Submit Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        orderNo: "",
        stakeholderName: "",
        product: "",
        quantity: 0,
        totalPrice: 0,
      },
    };
  },
  methods: {
    submitOrder() {
      // Logika untuk submit order atau kirim data ke backend
      console.log("Order Submitted:", this.order);
      // Reset form setelah submit
      this.order = {
        orderNo: "",
        stakeholderName: "",
        product: "",
        quantity: 0,
        totalPrice: 0,
      };
    },
  },
};
</script>

<style scoped>
.order-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.order-form-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>
