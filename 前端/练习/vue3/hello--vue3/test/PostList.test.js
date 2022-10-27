import { flushPromises, mount } from "@vue/test-utils";
import axios from 'axios';
import PostList from '../src/components/PostList.vue'
const mockPostList = [
  {id:1,title:'title1'},
  {id:2,title:'title2'}
]

jest.spyOn(axios,'get').mockResolvedValue(mockPostList);

test('loads posts on button click',async () => {
  const wrapper = mount(PostList);
  await wrapper.get('button').trigger('click');
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith('/api/posts');
  await flushPromises();
  const posts = wrapper.findAll('[data-test=post]')
  expect(posts).toHaveLength(2)
  expect(posts[0].text()).toContain('title1')
  expect(posts[1].text()).toContain('title2')
})

test('displays loading state on button click',async () => {
  const wrapper = mount(PostList);
  expect(wrapper.find('[role=alert]').exists()).toBe(false);
  expect(wrapper.find('button').attributes()).not.toHaveProperty('disabled')
  await wrapper.get('button').trigger("click");
  expect(wrapper.find('[role=alert]').exists()).toBe(true);
  expect(wrapper.find('button').attributes()).toHaveProperty('disabled')
  await flushPromises();
  expect(wrapper.find('[role=alert]').exists()).toBe(false);
  expect(wrapper.find('button').attributes()).not.toHaveProperty('disabled')
})