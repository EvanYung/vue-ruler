<template>
  <div class="ruler_container" ref="container">
    <div class="ruler_anchor">
      <div :class="['anchor_box',{focus}]">
        <input @blur="focus = false" @focus="focus = true" class="anchor_input" disabled type="number" v-model="value" />
      </div>
    </div>
    <div @scroll.stop="handleScroll" @touchstart.stop="startDrag" class="ruler_box" ref="scroll">
      <div>
        <span :style="`width: ${winWidth-10}px`"></span>
        <span :key="mark" class="mark" v-for="mark in blockNum">
          <span :key="cell" :num="block[0] + 5*interval*(mark-1) + interval*(cell-1)" class="cell" v-for="cell in cellNum(mark)"></span>
        </span>
        <span :style="`width: ${winWidth-10}px`"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInit: false,
      focus: false,
      winWidth: 0
    }
  },
  props: {
    fixed: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, String]
    },
    block: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    interval() {
      return Math.pow(10, -1 * this.fixed)
    },
    blockNum() {
      return (this.block[1] - this.block[0]) / (5 * this.interval) + 1
    }
  },
  watch: {
    block() {
      this.value2Left()
    }
  },
  methods: {
    cellNum(mark) {
      return mark === this.blockNum ? 1 : 5
    },
    startDrag(e) {
      if (this.disabled) return e.preventDefault()
    },
    handleScroll(e) {
      if (this.isInit) return (this.isInit = false)
      let left = e.target.scrollLeft
      this.left2Value(left)
    },
    left2Value(left) {
      let value = this.block[0] + ~~(left / 20) * this.interval
      this.$emit('input', value.toFixed(this.fixed))
    },
    value2Left() {
      setTimeout(() => {
        let value = new Number(this.value)
        this.$emit('input', value.toFixed(this.fixed))
        let left = ((value - this.block[0]) / this.interval) * 20
        this.isInit = true
        this.$refs.scroll.scrollLeft = left
      }, 10)
    }
  },
  mounted() {
    this.winWidth = this.$refs.container.clientWidth / 2
    this.value2Left()
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin/triangle.less';
.ruler_container {
  width: 100%;
  overflow: hidden;
  .ruler_anchor {
    width: 60px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    .anchor_box {
      position: relative;
      height: 100%;
      text-align: center;
      color: #fff;
      border-radius: 5px;
      background-color: @dark_color;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        transform: translateY(100%);
        left: 25px;
        .triangle(10px, 5px, @dark_color, down);
      }
      .anchor_input {
        width: 100%;
        outline: none;
        border: none;
        text-align: center;
        background-color: transparent;
        color: #fff;
      }
      &.focus {
        background-color: #fff;
        border: 1px solid @dark_color;
        .anchor_input {
          color: @dark_color;
        }
      }
    }
  }
  .ruler_box {
    width: 100%;
    white-space: nowrap;
    margin-top: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    span {
      position: relative;
      display: inline-block;
      overflow: visible;
    }
    .mark {
      border-top: 1px solid @border_color;
      margin-top: 5px;
      &.place {
        height: 30px;
      }
    }
    .cell {
      width: 20px;
      height: 30px;
      &::before {
        display: inline-block;
        content: '';
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: @border_color;
        position: absolute;
        top: -2px;
        left: 50%;
        transform: translateX(-50%);
      }
      &:first-child {
        &::before {
          background-color: @fade_color;
        }
        &::after {
          position: absolute;
          display: inline-block;
          content: attr(num);
          width: 20px;
          height: 20px;
          font-size: 12px;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
      }
    }
  }
}
</style>