<template>
  <div :class="$style.search">
      <div :class="$style.wrap">
        <input placeholder="Что хотите найти?" type="text">
        <svg :class="$style.searchIcon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.1526 11.5631C14.0892 10.3501 14.6671 8.84353 14.6671 7.20004C14.6671 3.22828 11.379 0 7.33353 0C3.28813 0 0 3.22835 0 7.20004C0 11.1718 3.2882 14.4001 7.33353 14.4001C8.84803 14.4001 10.2431 13.9501 11.4188 13.1674L15.9823 17.6479C16.2214 17.8826 16.5204 18 16.8193 18C17.1182 18 17.437 17.8826 17.6563 17.6479C18.1146 17.1979 18.1146 16.4544 17.6563 15.9848L13.1526 11.5631ZM2.3914 7.20004C2.3914 4.53916 4.60342 2.34784 7.33356 2.34784C10.0637 2.34784 12.2757 4.53912 12.2757 7.20004C12.2757 9.88046 10.0637 12.0522 7.33356 12.0522C4.60342 12.0522 2.3914 9.88049 2.3914 7.20004Z" fill="#333333"/>
        </svg>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Phone-Desktop-Search',
  components: {

  },
  props: {
  },
  setup(props) {
    return {

    };
  },
};
</script>

<style lang="scss" module src="./style.scss"></style>
