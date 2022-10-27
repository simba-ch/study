import { mount } from "@vue/test-utils";
import Input from "../src/components/Input.vue";

test('sets the value', async () => {
  const wrapper = mount(Input);
  const input = wrapper.get('input')
  await input.setValue('my@mail.com');

  expect(input.element.value).toBe('my@mail.com')
})

test('trigger', async () => {
  const wrapper = mount(Input);
  await wrapper.get('button').trigger('click');
  expect(wrapper.emitted()).toHaveProperty('submit')
})

test('emits the input to its parent', async () => {
  const wrapper = mount(Input);
  await wrapper.find('input').setValue('My@mail.com');
  await wrapper.find('button').trigger('click');
  expect(wrapper.emitted('submit')[0][0]).toEqual('My@mail.com')
})