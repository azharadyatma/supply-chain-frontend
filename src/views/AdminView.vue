<template>
  <div id="admin-view">
    <div class="scrollable-content">
      <Dashboard v-if="currentComponent === 'dashboard'" />
      <ItemList
        v-if="currentComponent === 'items'"
        @edit-item="showEditForm"
        @add-item="showAddForm"
      />
      <UserList v-if="currentComponent === 'users'" />
      <TransactionList v-if="currentComponent === 'transactions'" />
    </div>
    <Modal
      v-if="showForm"
      :isVisible="showForm"
      @close="canceledEditForm"
      :title="isEdit ? 'Edit Item' : 'Add Item'"
    >
      <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" />
    </Modal>
  </div>
</template>

<script>
import ItemList from "@/components/admin/item/ItemList.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import UserList from "@/components/admin/user/UserList.vue";
import TransactionList from "@/components/admin/transaction/TransactionList.vue";
import Modal from "@/components/Modal.vue";
import Dashboard from "@/components/admin/dashboard/dashboard.vue";

export default {
  components: {
    Dashboard,
    ItemList,
    ItemForm,
    UserList,
    TransactionList,
    Modal,
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
.admin-view {
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
</style>
