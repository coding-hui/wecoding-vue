import { ref, onMounted } from 'vue';

export function useDict(options) {
  const dict = ref({});

  function init() {
    console.log('init');
    console.log(options, 'options');
  }

  onMounted(() => {
    init();
  });

  return {
    dict,
  };
}
