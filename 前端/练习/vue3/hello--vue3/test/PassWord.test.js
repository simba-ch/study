import { mount } from "@vue/test-utils";
import PassWord from "../src/components/PassWord.vue";

test('render error if length is too short', () => {
  const wrapper = mount(PassWord, {
    props: {
      minLength: 10
    },
    data() {
      return {
        password: 'short'
      }
    }
  })

  expect(wrapper.html()).toContain('Password must be at least 10 characters')
})