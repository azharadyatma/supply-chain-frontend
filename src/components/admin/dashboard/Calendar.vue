<template>
  <div class="calendar-container">
    <!-- Tambahkan color dengan menggunakan ref selectedColor -->
    <DatePicker
      borderless
      v-model="date"
      title-position="left"
      :color="selectedColor"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";

// Gunakan ref untuk menentukan warna yang dipilih
const selectedColor = ref("indigo");

const date = ref(new Date());
</script>
