<template>
  <div id="admin-view">
    <div class="scrollable-content">
      <Dashboard v-if="currentComponent === 'dashboard'" />
      <ItemList
        v-if="currentComponent === 'products'"
        @edit-product="showEditForm"
        @add-product="showAddForm"
      />
      <UserList v-if="currentComponent === 'users'" />
      <TransactionList v-if="currentComponent === 'transactions'" />
      <Profile v-if="currentComponent === 'profile'" />
      <Label v-if="currentComponent === 'label'" />
    </div>
    <Modal
      v-if="showForm"
      :isVisible="showForm"
      @close="canceledEditForm"
      :title="isEdit ? 'Edit product' : 'Add product'"
    >
      <ItemForm
        :product="selectedproduct"
        :isEdit="isEdit"
        @submit="handleSubmit"
      />
    </Modal>
  </div>
</template>

<script>
import ItemList from "@/components/admin/item/ItemList.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import UserList from "@/components/admin/user/UserList.vue";
import TransactionList from "@/components/admin/transaction/TransactionList.vue";
import Profile from "@/components/admin/profile/Profile.vue";
import Modal from "@/components/Modal.vue";
import Dashboard from "@/components/admin/dashboard/dashboard.vue";
import Label from "@/components/admin/label/Label.vue";

export default {
  components: {
    Dashboard,
    ItemList,
    ItemForm,
    UserList,
    TransactionList,
    Modal,
    Label,
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
      selectedproduct: null,
      isEdit: false,
    };
  },

  methods: {
    showEditForm(product) {
      this.selectedproduct = product;
      this.isEdit = true;
      this.showForm = true;
    },
    showAddForm() {
      this.selectedproduct = null;
      this.isEdit = false;
      this.showForm = true;
    },
    handleSubmit(formData) {
      this.showForm = false;
      this.selectedproduct = null;
      this.isEdit = false;
    },
    canceledEditForm() {
      this.showForm = false;
      this.selectedproduct = null;
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
