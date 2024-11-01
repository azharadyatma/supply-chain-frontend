<template>
  <div class="user">
    <h2 class="user-title">User</h2>
    <div class="user-list">
      <div class="header">
        <h2>Daftar Pengguna</h2>
        <button class="add-btn" @click="$emit('add-user')">
          <i class="fa-solid fa-plus icon"></i>
          Tambah Pengguna
        </button>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>

              <td class="action-buttons">
                <button class="edit-btn" @click="$emit('edit-user', user)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" @click="deleteUser(user.id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: "1", username: "Asep", email: "asep@email.com", role: "Admin" },
        { id: "2", username: "Budi", email: "budi@email.com", role: "User" },
      ],
    };
  },

  methods: {
    deleteUser(id) {
      this.users = this.users.filter((user) => user.id !== id);
      this.$emit("delete-user", id);
    },
  },
};
</script>

<style scoped>
.user {
  padding: 20px;
}

.user-title {
  font-size: 32px;
  font-weight: bold;
  color: #736efe;
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
