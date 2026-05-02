import { h, defineComponent } from "vue";

export const Button = defineComponent({
  name: "MuxButton",
  props: {
    type: {
      type: String as () => "primary" | "success" | "danger" | "default",
      default: "default",
    },
    size: {
      type: String as () => "small" | "large" | "default",
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      const classes = [
        "mux-btn",
        props.type !== "default" ? `mux-btn--${props.type}` : "",
        props.size !== "default" ? `mux-btn--${props.size}` : "",
      ]
        .filter(Boolean)
        .join(" ");

      return h(
        "button",
        {
          class: classes,
          disabled: props.disabled,
        },
        slots["default"]?.(),
      );
    };
  },
});
