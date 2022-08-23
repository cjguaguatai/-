<template>
  <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      const option = {
        backgroundColor: '#161627',
        color: ['red', '#FFE434'],
        title: {
          text: '呱门',
          textStyle: {
            color: '#eee',
          },
        },
        legend: {
          data: ['呱呱太', '呱呱太小弟'],
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '呱', max: 100 },
            { name: '呱', max: 100 },
            { name: '呱', max: 100 },
            { name: '呱', max: 100 },
            { name: '呱', max: 100 },
            { name: '呱', max: 100 },
          ],
          axisName: {
            color: 'red',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)',
            },
          },
        },
        series: [
          {
            name: '呱呱太 vs 呱呱太小弟',
            type: 'radar',
            data: [
              {
                value: [95, 96, 94, 96, 99, 94],
                name: '呱呱太',
              },
              {
                value: [60, 60, 60, 60, 60, 70],
                name: '呱呱太小弟',
              },
            ],
            // itemStyle: {
            //   color: '#F9713C',
            // },
            areaStyle: {
              opacity: 0.1,
            },
          },
        ],
      }
      myChart.setOption(option)
    },
  },
}
</script>

<style scoped lang="scss">
#main {
  width: 400px;
  height: 400px;
}
</style>
