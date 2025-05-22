import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Post from '@/components/Post.vue';

vi.mock("@/components/Avatar.vue", () => ({
  default: {
    template: '<div class="mock-avatar"></div>',
    props: ["color", "size"],
  },
}));

describe("Post", () => {
  const data = {
    name: "John Doe",
    username: "johndoe",
    title: "Title",
    body: "This is a body text",
    color: "#ffffff"
  };

  it("renders correctly and passes props to Avatar", () => {
    const wrapper = mount(Post, {
      props: {
        data
      }
    });

    expect(wrapper.find(".mock-avatar").exists()).toBe(true);
    expect(wrapper.text()).toContain(data.name);
    expect(wrapper.text()).toContain(`@${data.username}`);
    expect(wrapper.text()).toContain(data.body);
  });
});
