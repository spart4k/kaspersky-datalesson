import { ref, onMounted, computed } from 'vue'

export default function useMobile() {
  const clientWidth = ref(null);

  const onResize = () => {
    clientWidth.value = document.body.clientWidth;
  };

  const isMobile = computed(() => (clientWidth.value <= 450 ? true : false));

  onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
  });

  return isMobile;
}