import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '@/components/Avatar.vue'

const mockRouterLink = {
  name: 'RouterLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
};

describe('Avatar.vue', () => {
  it('renders RouterLink with correct path when id exists', () => {
    const wrapper = mount(Avatar, {
      global: {
        components: { RouterLink: mockRouterLink },
        mocks: {
          $route: { path: '/current-path' },
        },
      },
      props: {
        id: 123,
      }
    });

    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/users/123');
  });

  it("renders RouterLink with current path when id doesn't exist", () => {
    const wrapper = mount(Avatar, {
      global: {
        components: { RouterLink: mockRouterLink },
        mocks: {
          $route: { path: '/users/0' },
        },
      },
    });

    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/users/0');
  });
});
