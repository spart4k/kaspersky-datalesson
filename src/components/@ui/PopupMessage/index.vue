<template>
  <div :class="[$style.outer, items.length === 0 && $style.hidden]">
    <div :class="$style.skb" @mouseover="() => handleHover(true)" @mouseout="() => handleHover(false)"></div>
    <div :class="$style.wrapper" ref="container">
      <transition-group name="fade-list" :class="$style.list">
        <template v-for="(item, index) in items">
          <Item
            :key="index"
            :item="item"
            :class="$style.listItem"
            :index="index"
            :lastIndex="items.length - 1"
            v-bind="$props"
            @click="$emit('click', $event)"
          >
            <template slot="content">
              <slot name="content" :item="item"/>
            </template>
          </Item>
        </template>
      </transition-group>
      <transition-group name="fade-list" :class="$style.list">
        <template v-if="showTask">
          <template v-for="(item, index) in task">
            <Item
              :key="index"
              :item="item"
              :class="$style.listItem"
              :index="index"
              v-bind="$props"
              @click="$emit('click', $event)"
            >
              <template slot="content">
                <slot name="content" :item="item"/>
              </template>
            </Item>
          </template>
        </template>
      </transition-group>
    </div>
  </div>
</template>
<script lang="javascript" src="./setup.js"></script>
<style lang="scss" module src="./style.scss"></style>
