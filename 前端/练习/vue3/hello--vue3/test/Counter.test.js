import { mount } from "@vue/test-utils";
import Counter from "../src/components/Counter.vue";

test('emits an event when clicked', () => {
  const wrapper = mount(Counter);
  wrapper.find('button').trigger('click')
  wrapper.find('button').trigger('click')
  expect(wrapper.emitted()).toHaveProperty('increment')
})

test('emits an event with count when clicked', () => {
  const wrapper = mount(Counter);

  wrapper.find('button').trigger('click');

  wrapper.find('button').trigger('click');

  const incrementEvent = wrapper.emitted('increment');

  expect(incrementEvent).toHaveLength(2);
  expect(incrementEvent[0][0]).toEqual({ count: 1, isEvent: false });
  expect(incrementEvent[1]).toEqual([{ count: 2, isEvent: true }])
})