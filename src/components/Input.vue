<script lang="ts" setup>
import SearchIcon from 'virtual:vite-icons/ic/round-search';

interface Props {
   modelValue: string;
   placeholder?: string;
   icon?: any;
}

interface Emits {
   (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
   icon: SearchIcon,
   placeholder: ''
});
const emits = defineEmits<Emits>();

function handleInput(e: Event) {
   const el = e.target;
   if (el && el instanceof HTMLInputElement) {
      emits('update:modelValue', el.value);
   }
}
</script>

<template>
   <section class="input-section">
      <span class="input-wrapper">
         <component :is="props.icon" class="input-icon" />
         <input
            spellcheck="false"
            translate="no"
            :value="props.modelValue"
            @input="handleInput"
            :placeholder="props.placeholder"
            class="input"
            type="text"
         />
         <div class="line"></div>
      </span>
   </section>
</template>

<style lang="scss" scoped>
.input-section {
   .input-wrapper {
      @apply transform shadow shadow-dark-400 inline-block w-full relative overflow-hidden rounded-4px;

      .line {
         @apply w-full transform translate-y-[125%] bottom-0 left-0 right-0 h-3px bg-violet-400 absolute mx-auto;
         transition: transform 0.25s;
         will-change: transform;
      }

      .input {
         @apply w-full text-gray-700 border-0 outline-none text-size-14px p-2 pl-8;
      }

      .input:focus ~ .line {
         @apply translate-y-[0%];
      }

      .input-icon {
         @apply absolute left-0 text-gray-500 text-size-20px top-0 bottom-0 my-auto left-5px;
      }
   }
}
</style>
