<template>
  <div class="highcharts-container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";

export default {
  name: "BarChart",
  components: {
    highcharts: HighchartsVue.component,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },
        title: {
          text: "Total Vehicle Parts Sales per Month",
          style: {
            color: "#736efe",
            fontSize: "20px",
          },
        },
        xAxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        yAxis: {
          title: {
            text: "Sales",
          },
        },
        series: [
          {
            name: "Total Sales",
            data: [], // Data akan diisi secara otomatis
          },
        ],
        colors: ["#736efe"],
      },
    };
  },
  methods: {
    // Fungsi untuk mendapatkan data penjualan per bulan
    getSalesData() {
      // Data penjualan per bulan untuk seluruh part kendaraan
      const salesData = {
        January: [500, 600, 700, 800],
        February: [400, 1500, 1600, 700],
        March: [1300, 1400, 1500, 1600],
        April: [1350, 1450, 1550, 1650],
        May: [1250, 1350, 1450, 1550],
        June: [1400, 1500, 1600, 1700],
        July: [1450, 1550, 1650, 1750],
        August: [1500, 1600, 1700, 1800],
        September: [1600, 700, 800, 1900],
        October: [1550, 1650, 1750, 1850],
        November: [1450, 1550, 1650, 1750],
        December: [1400, 1500, 1600, 1700],
      };

      // Menghitung total penjualan untuk setiap bulan
      const totalSales = Object.values(salesData).map((monthData) =>
        monthData.reduce((acc, value) => acc + value, 0)
      );

      return totalSales; // Kembalikan total penjualan untuk semua bulan
    },
  },
  mounted() {
    // Memasukkan data penjualan ke dalam chartOptions ketika komponen dimuat
    this.chartOptions.series[0].data = this.getSalesData();
  },
};
</script>

<style scoped>
.highcharts-container {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
