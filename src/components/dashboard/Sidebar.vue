<template>
  <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
    <img src="@/assets/logoRumin.png" alt="Rumin Autoparts Logo" class="logo" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    />

    <p class="menu-title">MENU</p>

    <ul>
      <li>
        <button
          @click="showComponent('dashboard')"
          :class="{ active: activeComponent === 'dashboard' }"
        >
          <i
            class="fa-solid fa-house"
            :class="{
              'icon-active': activeComponent === 'dashboard',
              'icon-inactive': activeComponent !== 'dashboard',
            }"
          ></i>
          Dashboard
        </button>
      </li>

      <li v-if="currentRole === 'admin'">
        <button
          @click="showComponent('users')"
          :class="{ active: activeComponent === 'users' }"
        >
          <i
            class="fas fa-users"
            :class="{
              'icon-active': activeComponent === 'users',
              'icon-inactive': activeComponent !== 'users',
            }"
          ></i>
          Users
        </button>
      </li>

      <li>
        <button
          @click="showComponent('items')"
          :class="{ active: activeComponent === 'items' }"
        >
          <i
            class="fa-solid fa-box-archive"
            :class="{
              'icon-active': activeComponent === 'items',
              'icon-inactive': activeComponent !== 'items',
            }"
          ></i>
          Products
        </button>
      </li>

      <li>
        <button
          @click="showComponent('transactions')"
          :class="{ active: activeComponent === 'transactions' }"
        >
          <i
            class="fas fa-cart-shopping"
            :class="{
              'icon-active': activeComponent === 'transactions',
              'icon-inactive': activeComponent !== 'transactions',
            }"
          ></i>
          Orders
        </button>
      </li>

      <li v-if="currentRole == 'user'">
        <button
          @click="showComponent('history')"
          :class="{ active: activeComponent === 'history' }"
        >
          <i
            class="fas fa-history"
            :class="{
              'icon-active': activeComponent === 'history',
              'icon-inactive': activeComponent !== 'history',
            }"
          ></i>
          History
        </button>
      </li>

      <li>
        <button
          @click="showComponent('transactions')"
          :class="{ active: activeComponent === 'label' }"
        >
          <i
            class="fa-solid fa-tags"
            :class="{
              'icon-active': activeComponent === 'label',
              'icon-inactive': activeComponent !== 'label',
            }"
          ></i>
          Label
        </button>
      </li>

      <li>
        <button
          @click="showComponent('transactions')"
          :class="{ active: activeComponent === 'profile' }"
        >
          <i
            class="fa-solid fa-user"
            :class="{
              'icon-active': activeComponent === 'profile',
              'icon-inactive': activeComponent !== 'profile',
            }"
          ></i>
          Profile
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentRole: {
      type: String,
      required: true,
    },

    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      activeComponent: null,
    };
  },

  methods: {
    showComponent(component) {
      this.activeComponent = component;
      this.$emit("showComponent", component);
    },
  },

  emits: ["showComponent"],
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #ffffff;
  color: #736efe;
  padding: 14px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  font-size: 18px;
  font-family: sans-serif;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar.hidden {
  transform: translateX(-100%);
}

.logo {
  max-width: 150px;
  height: auto;
  display: block;
  margin: 20px auto;
}

.menu-title {
  font-size: 10px;
  color: #cbcbcb;
  margin: 20px 0 20px;
  text-align: left;
  padding-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 20px;
  text-align: center;
}

button {
  color: #736efe;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 35px;
  width: 100%;
}

button:hover {
  background-color: #ffffff;
  border-radius: 8px;
}

button.active {
  background-color: #736efe;
  border-radius: 8px;
  color: #ffffff;
}

button i {
  color: #736efe;
  margin-right: 10px;
}

.icon-active {
  color: #ffffff; /* Warna untuk ikon aktif */
}

.icon-inactive {
  color: #736efe; /* Warna untuk ikon tidak aktif */
}
</style>
