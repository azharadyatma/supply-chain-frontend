<template>
  <div id="user-view">
    <div>
      <div class="scrollable-content">
        <ItemList
          v-if="currentComponent === 'items'"
          @edit-item="showEditForm"
        />
        <UserList v-if="currentComponent === 'users'" />
        <TransactionList v-if="currentComponent === 'transactions'" />
        <HistoryList v-if="currentComponent === 'history'" />
        <Profile v-if="currentComponent === 'profile'" />
      </div>
    </div>
    <div v-if="showForm" class="form-container">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="canceledEditForm"
      />
    </div>
  </div>
</template>

<script>
import ItemList from "@/components/user/item/ItemList.vue";
import ItemForm from "@/components/user/item/ItemForm.vue";
import UserList from "@/components/admin/user/UserList.vue";
import TransactionList from "@/components/user/transaction/TransactionList.vue";
import Profile from "@/components/user/profile/Profile.vue";
import HistoryList from "@/components/user/history/HistoryList.vue";

export default {
  components: {
    ItemList,
    ItemForm,
    UserList,
    TransactionList,
    HistoryList,
    Profile,
  },

  props: {
    currentComponent: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false,
    };
  },

  methods: {
    showEditForm(item) {
      this.selectedItem = item;
      this.isEdit = true;
      this.showForm = true;
    },
    showAddForm() {
      this.selectedItem = null;
      this.isEdit = false;
      this.showForm = true;
    },
    handleSubmit(formData) {
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },
    canceledEditForm() {
      this.showForm = false;
      this.selectedItem = null;
      this.isEdit = false;
    },
  },
};
</script>

<style scoped>
.user-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  max-height: calc(100vh - 60px);
}

.form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
