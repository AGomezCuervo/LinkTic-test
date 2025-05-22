import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Users from '@/components/Users.vue';

vi.mock("@/components/User.vue", () => ({
  default: {
    props: ['data'],
    template: '<div class="mock-user">{{ data.username }}</div>',
  },
}));

const usersData = [
  { name: "John Doe", username: "john", website: "john@gmail.com" },
  { name: "John Doe2", username: "john2", website: "john@gmail.com2" },
];

describe("Users.vue", () => {
  it("renders a User for each item in data", () => {
    const wrapper = mount(Users, {
      props: {
        data: usersData
      },
    });

    const userWrappers = wrapper.findAll(".mock-user");
    expect(userWrappers.length).toBe(usersData.length);
    expect(userWrappers[0].text()).toContain("john");
    expect(userWrappers[1].text()).toContain("john2");
  });
});
