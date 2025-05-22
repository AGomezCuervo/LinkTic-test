import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      attrs: {
        onClick
      },
      slots: {
        default: 'Click me'
      }
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('accepts and renders additional classes', () => {
    const wrapper = mount(Button, {
      attrs: {
        class: 'my-class'
      }
    })

    expect(wrapper.attributes('class')).toContain('my-class')
    expect(wrapper.attributes('class')).toContain('base-button')
  })
})
