<template>
  <div class="user">
    <div class="user-list">
      <div class="header">
        <h2>User List</h2>
        <button class="add-btn" @click="showAddForm">Add User</button>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button class="edit-btn" @click="editUser(user)">Edit</button>
                <button class="delete-btn" @click="handleDeleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal :visible="showForm" @close="cancelEditForm">
        <UserForm
          :user="selectedUser"
          :isEdit="isEdit"
          @submit="handleSubmit"
          @cancel="cancelEditForm"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/components/Modal.vue";
import UserForm from "@/components/admin/user/UserForm.vue";
import eventBus from "@/utils/EventBus";

export default {
  name: "users",
  components: {
    Modal,
    UserForm,
  },

  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const users = computed(() => userStore.users);

    onMounted(() => {
      if (authStore.token) {
        userStore.fetchUsers();
      } else {
        console.error("User is not authenticated");
      }
    });

    return {
      users,
      userStore,
    };
  },

  data() {
    return {
      showForm: false,
      selectedUser: null,
      isEdit: false,
      searchQuery: "",
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.username?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    showAddForm() {
      this.selectedUser = {
        id: "",
        username: "",
        email: "",
        role: "STAKEHOLDER",
      };
      this.isEdit = false;
      this.showForm = true;
    },

    editUser(user) {
      this.selectedUser = { ...user };
      this.isEdit = true;
      this.showForm = true;
    },

    async handleSubmit(user) {
      if (this.isEdit) {
        await this.userStore.updateUser(user);
      } else {
        await this.userStore.addUser(user);
      }

      await this.userStore.fetchUsers(); // Fetch latest users
      this.showForm = false;
    },

    cancelEditForm() {
      this.showForm = false;
    },

    async handleDeleteUser(id) {
      await this.userStore.deleteUser(id);
      await this.userStore.fetchUsers(); // Fetch latest users
    },

    handleSearch(query) {
      this.searchQuery = query;
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
.user {
  padding: 20px;
}

.user-list {
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
  margin-bottom: 20px;
}

h2 {
  color: #736efe;
  font-weight: 600;
  font-size: 24px;
}

.add-btn {
  background-color: #736efe;
  color: white;
  padding: 10px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
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
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  border-top: 0.5px solid #cbcbcb;
  border-bottom: 0.5px solid #cbcbcb;
}

th {
  background-color: #736efe;
  color: white;
  font-size: 14px;
  font-weight: 600;
}
button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.edit-btn {
  background-color: #fed86e;
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #bca052;
}

.delete-btn {
  background-color: #df3636;
  color: white;
}

.delete-btn:hover {
  background-color: #bb3232;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }
}
</style>
