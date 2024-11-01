<template>
  <div>
    <form @submit.prevent="submitForm" class="mb-3 p-3 shadow-sm bg-white rounded">
      <table class="table">
        <tr>
          <td><label for="kode" class="form-label">Kode Barang</label></td>
          <td>
            <input
              type="number"
              v-model="form.kode"
              id="kode"
              class="form-control"
              :disabled="isEdit"
              required
            />
          </td>
        </tr>
        <tr>
          <td><label for="nama" class="form-label">Nama Barang</label></td>
          <td>
            <input
              type="text"
              v-model="form.nama"
              id="nama"
              class="form-control"
              required
            />
          </td>
        </tr>
        <tr>
          <td><label for="deskripsi" class="form-label">Deskripsi</label></td>
          <td>
            <input
              type="text"
              v-model="form.deskripsi"
              id="deskripsi"
              class="form-control"
              required
            />
          </td>
        </tr>
        <tr>
          <td><label for="stok" class="form-label">Stok</label></td>
          <td>
            <input
              type="number"
              v-model="form.stok"
              id="stok"
              class="form-control"
              required
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button type="submit" class="btn btn-success w-100">
              {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
            </button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        kode: "",
        nama: "",
        deskripsi: "",
        stok: 0,
      },
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (this.isEdit) {
          this.form = { ...newItem };
        } else {
          this.form = {
            kode: "",
            nama: "",
            deskripsi: "",
            stok: 0,
          };
        }
      },
    },
  },
  methods: {
    submitForm() {
      if (
        this.form.kode &&
        this.form.nama &&
        this.form.deskripsi &&
        this.form.stok !== null &&
        this.form.stok !== undefined
      ) {
        this.$emit("submit", this.form);
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
}

td {
  padding: 8px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
}

.btn-success {
  background-color: #35c88d;
  color: white;
}

.btn-success:hover {
  background-color: #23855e;
}
</style>
