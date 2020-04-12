<template>
  <div class="code-box">
    <div class="content"><slot name="content"></slot></div>
    <div class="explain" v-if="explainSlotState">
      <div class="title"><span>说明</span></div>
      <div class="text">
        <slot name="explain"></slot>
      </div>
    </div>
    <div ref="code" class="code-wrap" :style="{ height: height }">
      <div class="code"><slot></slot></div>
    </div>
    <div class="show-code" @click="showCode">{{ showText }}</div>
  </div>
</template>

<script>
export default {
  name: 'BlockWrap',
  data () {
    return {
      showText: '显示代码',
      relHeight: 0,
      isShow: false,
      height: 'auto',
      explainSlotState: false
    }
  },
  created () {
    if (this.$slots.explain) {
      this.explainSlotState = true
    }
  },
  mounted () {
    this.relHeight = this.$refs.code.getBoundingClientRect().height
    this.height = '0px'
  },
  computed: {
    getCodeStyle () {
      return this.codeStyle
    }
  },
  methods: {
    showCode () {
      if (this.isShow) {
        this.isShow = false
        this.height = '0px'
        this.showText = '显示代码'
      } else {
        this.isShow = true
        this.height = this.relHeight + 'px'
        this.showText = '隐藏代码'
      }
    }
  }
}
</script>

<style scoped>
.code-box {
  border: 1px solid #eeeeee;
}

.code-box:hover {
  box-shadow: 0 0 10px 0 #ecf3fb;
}

.code-box > .content {
  position: relative;
  padding: 20px;
  z-index: 10;
}

.code-box > .code-wrap {
  height: auto;
  overflow: hidden;
  transition: height 0.2s;
  border-bottom-width: 0;
  background-color: #f6f8fa;
}

.code-box > .code-wrap > .code {
  margin: 10px;
}

.code-box > .code-wrap > .code pre {
  margin-bottom: 0;
}

.code-box > .explain {
  margin: 10px;
}

.code-box > .explain > .title {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.code-box > .explain > .title::before {
  content: '';
  flex-grow: 0;
  width: 20px;
  height: 50px;
  height: 0;
  margin-top: 25px;
  border-top: 1px solid #e8eaec;
}

.code-box > .explain > .title > span {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}

.code-box > .explain > .title::after {
  content: '';
  flex-grow: 1;
  height: 0;
  margin-top: 25px;
  border-top: 1px solid #e8eaec;
}

.code-box > .explain > .text {
  padding: 0 5px;
  text-indent: 15px;
  font-size: 13px;
  color: #8a8a8a;
}

.code-box > .show-code {
  height: 40px;
  line-height: 40px;
  border-top: 1px dotted #d8d8d8;
  background-color: #fff;
  text-align: center;
  color: #d8d8d8;
  cursor: pointer;
}

.code-box > .show-code:hover {
  color: #409dff;
}
</style>
