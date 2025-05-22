import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import User from './User.vue'
import { h } from 'vue'

const MockAvatar = {
  name: 'Avatar',
  props: ['id', 'size', 'color'],
  template: '<div class="mock-avatar"></div>',
}

const RouterLinkStub = {
  name: 'RouterLink',
  props: ['to'],
  render() {
    return h('a', { class: 'router-link-stub' }, this.$slots.default?.())
  }
}

describe('User.vue', () => {
  const data = {
    id: 1,
    name: 'Alice',
    username: 'alice01',
    website: 'alice.dev',
    email: 'alice@example.com',
    phone: '123-456',
    color: '#ffcc00'
  }

  it('renders user data and passes props to Avatar', () => {
    const wrapper = mount(User, {
      props: { data },
      global: {
        components: {
          Avatar: MockAvatar,
          RouterLink: RouterLinkStub
        }
      }
    })

    const avatar = wrapper.findComponent(MockAvatar)
    expect(avatar.exists()).toBe(true)
    expect(avatar.props('id')).toBe(data.id)
    expect(avatar.props('size')).toBe('60px')
    expect(avatar.props('color')).toBe(data.color)

    expect(wrapper.text()).toContain(data.name)
    expect(wrapper.text()).toContain(`@${data.username}`)
    expect(wrapper.text()).toContain(`website: ${data.website}`)

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toBe(`/users/${data.id}`)
  })
})
