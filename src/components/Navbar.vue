<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="#" class="navbar-item">InventoryHub</a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click.prevent="navigateTo('user')"> User </a>
        <a class="navbar-item" @click.prevent="navigateTo('item')"> Item </a>
        <a class="navbar-item" @click.prevent="navigateTo('transaction')">
          Transaction
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    navigateTo(page) {
      this.$emit("navigate-to", page);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #35c88d;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-item {
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.navbar-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.navbar-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .navbar-menu {
    width: 100%;
    justify-content: center;
  }

  .navbar-start {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .navbar-item {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .navbar-item:last-child {
    border-bottom: none;
  }
}
</style>
