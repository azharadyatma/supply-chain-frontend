<template>
  <div class="item-card card mb-3">
    <div class="card-body">
      <h3 class="card-title">{{ item.nama }}</h3>
      <p class="card-text">{{ item.deskripsi }}</p>
      <p class="card-text fw-bold">Stok: {{ item.stok }}</p>
      <div class="d-flex gap-2 mt-3">
        <button @click="$emit('edit-item', item)" class="btn btn-warning text-white">Edit</button>
        <button @click="$emit('delete-item', item.kode)" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5em;
  color: #333;
}
</style>
