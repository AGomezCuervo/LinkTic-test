import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Posts from './Posts.vue';

vi.mock('@/components/Post/Post.vue', () => ({
  default: {
    props: ['data'],
    template: '<div class="mock-post">{{ data.username }}</div>',
  },
}));

const postsData = [
  { name: 'John Doe', username: 'john', title: 'Post 1', body: 'Body 1', color: 'red' },
  { name: 'Jane Doe', username: 'jane', title: 'Post 2', body: 'Body 2', color: 'blue' },
];

describe('Posts.vue', () => {
  it('renders a Post for each item in data', () => {
    const wrapper = mount(Posts, {
      props: {
        data: postsData
      },
    });

    const postWrappers = wrapper.findAll('.mock-post');
    expect(postWrappers.length).toBe(postsData.length);
    expect(postWrappers[0].text()).toContain('john');
    expect(postWrappers[1].text()).toContain('jane');
  });
});
