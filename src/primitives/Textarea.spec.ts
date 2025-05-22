import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Textarea from './Textarea.vue';

describe("Textarea.vue", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

  it("renders correctly and binds v-model", async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "initial value",
        "onUpdate:modelValue": vi.fn()
      }
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.element.value).toBe("initial value");

    await textarea.setValue("new value");
    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"]?.[0]).toEqual(["new value"]);
  });

  it("binds additional attributes", () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": vi.fn()
      },
      attrs: {
        placeholder: "Write here...",
        disabled: true
      }
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.attributes("placeholder")).toBe("Write here...");
    expect(textarea.attributes("disabled")).toBeDefined();
  });

  it("adjusts height on content change", async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": () => {}
      }
    });

    const textarea = wrapper.find("textarea");

    Object.defineProperty(textarea.element, "scrollHeight", {
      configurable: true,
      get: () => 200
    });

    await wrapper.setProps({ modelValue: "Nueva línea\nOtra línea" });

    expect(textarea.element.style.height).toBe("200px");
  });

	it("limits height to 264px", async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": () => {}
      }
    });

    const textarea = wrapper.find("textarea");

    Object.defineProperty(textarea.element, "scrollHeight", {
      configurable: true,
      get: () => 300
    });

    await wrapper.setProps({ modelValue: "Texto muy largo\n".repeat(30)});

    expect(textarea.element.style.height).toBe("264px");
  })
})
