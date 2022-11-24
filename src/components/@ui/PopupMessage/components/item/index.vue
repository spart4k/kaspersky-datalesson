<template>
  <div
    :class="[$style.popupWrap, $style.popupWrapMode]"
  >
    <div :class="[
        $style.popup,
        lastIndex === index && $style.popupMode,
        item.black && $style.black,
        item.maxWidthNone && $style.maxWidthNone,
        item.highlight && $style.highlight,
      ]"
    >

      <div :class="[
          $style.content,
          lengthDisabled > index && $style.contentMode,
          item.emoji && $style.emojiFz
        ]"
      >
        <div v-if="!$slots.content" :class="[item.buttonTextTitle && $style.mb20,  item.buttonTitle && $style.mb20]" v-html="item.text">
        </div>
        <slot name="content"></slot>
      </div>

      <v-btn
        v-if="item.buttonTitle && !$slots.content"
        :class="$style.button"
        @click="$emit('click', item)"
        :disabled="lengthDisabled > index"
        :black="item.highlight"
        sm
      >
        {{item.buttonTitle}}
      </v-btn>

      <div v-if="item.buttonTextTitle" :class="$style.btnTextWrapp" @mouseover="tooltip = true" @mouseout="tooltip = false">
        <div :class="[$style.btnText, lengthDisabled > index && $style.opacity04]"><transition name="fade-up"><l-tooltip @click="tooltip = false" v-if="item.tooltip && tooltip" :text="item.tooltip"/></transition>{{item.buttonTextTitle}}</div>
        <span :class="$style.command">
          и нажми
        <svg class="svgEnter" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="24" height="24" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_854_5462" transform="scale(0.01)"/></pattern><image id="image0_854_5462" width="100" height="100" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAADoUlEQVR4nO2csW7TUBSGPwrNQjt2AKUsIKFuCNgqMfAAECooCy/BwsxGC49RVBWQaMtQdlZA6oQqoAgJiQegmQARhhvRxLnBjWrfc2z/n3SHuFHO8f1qX/v6XIMQQgjRLFrAMrAO7AFdoOesdfu5rfdzbZXSEw5YAvax7/BJ22fgVgn9YcYU8Bj7jj1uW+3vS+V5gn1nFtVWCu6b5Cxh34lFt06hPZSQFuH8a92BRbd9KjrQL2PfeWW129mdrcLgUqsrkwwjp60qCLlinUCJXM1uOGGRxYQcADPWSZREF5gd3FAFIT3rBEpmyEEVTlmNQkKcISHOkBBnSIgzJMQZEuIMCXGGhDhDQpwhIc6QEGdIiDMkxBkS4gwJOWQHaAPzwGvjXFyTquCgPRBzPmHcIfTE8JBsX5jE1SnLGRLiDAlxhoQ4Q0KcISHOkBBnnDri91qEwuAOcJlwE3W6rKTE/6nqmr5j3TEbxh1LXdb01UZIndb0VV5IHdf0VUJIbHKxBXwAzkf+VmfcTi52aJ4MN8SE1HlNn3tiQuq8ps89MSFnkmch/hEb1FMNZt5wO6gLQyTEGRLiDA9CtghlN6qHGkPK6YoNhh8BtBPHdzd1YnmEPAPuAb8HtlnViR1kPs9Gv2WExZFB//NmovjZtpfJ5WLC2LlYydhI2AnZtpbJ53rC2Lk0TUaP0ReJPUwYO5eyAj9nVMZJ4GnCnY+12Kv2dhPGz6WMoF6PjD/AjUxeC4lzyKXogF6PjB7wKLL/qS8scikymOcjY4XRy/5Fg1xyqbuMj8DNyH7PAV8N8smlbjIOCDUCa4SrqenIPreANwa5JRGyydErIj0wh52MJELmJ+4SOxaxOU0lFXJu0l4xYAF4ia2IqJAyHuFuAXcYnjS0ZIYwi3wWuEYY0C+ZZjRM7oRqEdZfEL/3WCvo9+vUcikqkKQ4EyIpDoVIikMhkuJQiKQ4FCIpDoVIikMhPfwVOTReyDgplnVZLoRY1mXdJTw1HJRShfd3JSf1f8gmh6/W2zGIb92G0PoQe7Q+xDMS4gwJcUZMSDd5Fs3lR3ZDTMj3BImIwEhfx4S8S5CICLzNbogJ2U6QiAi8ym6I3YdMEwrLLpSeTrP5Qqh++Tm4MXaE/AIepMiowfSA+2Rk5NGkt8mlbrGq+1ymgFUHydepjau6n4gO8MnBzlS9jau6H+Ko093T/R/rEF7f1CZUBIrxdIFvwHvCles2YXwWQgghSuEvqsaA2T/sSpIAAAAASUVORK5CYII="/></defs></svg> Enter
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
