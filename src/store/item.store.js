import { defineStore } from "pinia";

export const useItemStore = defineStore("item", {
  state: () => ({
    items: [
      {
        kode: "2024001",
        nama: "Acer Nitro 15 AN515-58",
        deskripsi: "Intel Core i5 12500H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
        stok: 80,
      },
      {
        kode: "2024002",
        nama: "Lenovo LOQ 15 15IRH8",
        deskripsi: "Intel Core i5 13450H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
        stok: 80,
      },
    ],
  }),
  getters: {
    getItemByKode: (state) => (kode) => {
      return state.items.find((item) => item.kode === kode);
    },
    totalItem: (state) => state.items.length,
    avalaibleItems: (state) => state.items.filter((item) => item.stok > 0),
  },
  actions: {
    addItem(item) {
      this.items.push(item);
    },

    updateItem(updatedItem) {
      const index = this.items.findIndex(
        (item) => item.kode === updatedItem.kode
      );

      if (index !== -1) {
        this.items[index] = updatedItem;
      }
    },

    deleteItem(kode) {
      this.items = this.items.filter((item) => item.kode !== kode);
    },
  },

  persist: true, // Aktifkan persistensi state
});
