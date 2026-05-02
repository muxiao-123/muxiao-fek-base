import { h, defineComponent } from "vue";

export const Input = defineComponent({
  name: "MuxInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return () => {
      return h("input", {
        class: "mux-input",
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        onInput: (e: Event) => {
          emit("update:modelValue", (e.target as HTMLInputElement).value);
        },
      });
    };
  },
});