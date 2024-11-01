<template>
  <div id="app">
    <Header
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <div class="app-content">
      <Sidebar
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @show-component="navigateTo"
      />
      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <component
          :is="currentView"
          :currentComponent="currentComponent"
          v-if="currentRole === 'admin'"
          @add-user="handleAddUser"
          @edit-user="handleEditUser"
          @delete-user="handleDeleteUser"
          @add-item="handleAddItem"
          @edit-item="handleEditItem"
          @delete-item="handleDeleteItem"
        />
        <component
          :is="currentView"
          v-else
          :currentComponent="currentComponent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/dashboard/Header.vue";
import Sidebar from "./components/dashboard/Sidebar.vue";
import AdminView from "./views/AdminView.vue";
import UserView from "./views/UserView.vue";
import { EventBus } from "./utils/EventBus.js";

export default {
  components: {
    Header,
    Sidebar,
    AdminView,
    UserView,
  },

  data() {
    const params = new URLSearchParams(window.location.search);

    return {
      currentRole: params.get("role") || "admin",
      currentComponent: params.get("component") || "items",
      isSidebarVisible: params.get("sidebar") !== "hidden",
    };
  },

  computed: {
    currentView() {
      return this.currentRole === "admin" ? AdminView : UserView;
    },
  },

  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("items");
    },

    navigateTo(component) {
      this.currentComponent = component;
      this.updateURLParams();
    },

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.updateURLParams();
    },

    updateURLParams() {
      const params = new URLSearchParams();
      params.set("role", this.currentRole);
      params.set("component", this.currentComponent);
      params.set("sidebar", this.isSidebarVisible ? "visible" : "hidden");

      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    },

    handleSearch(newQuery) {
      console.log("Search term:", newQuery);
      if (this.currentRole === "admin") {
        console.log("Search in admin items");
      } else if (this.currentRole === "user") {
        console.log("Search in user items");
      }
    },

    handleAddItem(item) {
      console.log("Item added:", item);
    },

    handleEditItem(item) {
      console.log("Item edited:", item);
    },

    handleDeleteItem(itemId) {
      console.log("Item deleted:", itemId);
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
.app-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  font: 1em sans-serif;
  height: 100vh;
  margin-top: 60px;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

.main-content.expanded {
  margin-left: 200px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
