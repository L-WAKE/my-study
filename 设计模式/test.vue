<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      datalist: [
        {
          name: '路人甲',
          age: 21,
          work: '搬砖2'
        },
        {
          name: '路人乙',
          age: 23,
          work: '搬砖1'
        },
        {
          name: '路人丁',
          age: 24,
          work: '搬砖9'
        }
      ],
      adddata: {
        name: '6',
        age: 77,
        work: '搬砖6'
      },
      postion: ['frist', 'among', 'end']
    }
  },
  methods: {
    sortWay (val, changeitem) { // 增加位置，
      var newList = []
      if (val === 'frist') {
        newList = this.datalist.splice(0, 0, this.adddata)
        console.log(newList)
      }
      if (val === 'among') {
        this.datalist.forEach((item, index) => {
          if (item.name === changeitem) { // 放入对应项的后面
            newList = this.datalist.splice(index + 1, 0, this.adddata)
          }
        })
      } else {
        newList = this.datalist.push(this.adddata)
      }
      this.datalist = newList // 不论增加的位置在哪 统一赋值导出
      this.tongWay() // 重新处理索引
    },
    tongWay() {
      this.datalist.forEach((item, index) => {
        this.$set(item, 'key', index)
      })
      console.log(this.datalist)
    }
  },
  created() {
    this.sortWay(this.postion[0], '')
  }
}
</script>

<style lang="less" scoped>

</style>