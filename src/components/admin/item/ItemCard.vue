<template>
  <div class="item-card">
    <h3>{{ item.nama }}</h3>
    <p>{{ item.deskripsi }}</p>
    <p class="stock">Stok: {{ item.stok }}</p>
    <div class="buttons">
      <button @click="$emit('edit-item', item)" class="edit">Edit</button>
      <button @click="$emit('delete-item', item.kode)" class="delete">
        Delete
      </button>
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
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item-card h3 {
  margin: 0 0 10px;
  font-size: 1.5em;
  color: #333;
}

.item-card p {
  margin: 5px 0;
  color: #555;
}

.item-card .stock {
  font-weight: bold;
  color: #2c3e50;
}

.item-card .buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.item-card button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.item-card button:hover {
  background-color: #ddd;
}

.item-card button.edit {
  background-color: #fed86e;
  color: white;
}

.item-card button.edit:hover {
  background-color: #bca052;
}

.item-card button.delete {
  background-color: #df3636;
  color: white;
}

.item-card button.delete:hover {
  background-color: #bb3232;
}
</style>
