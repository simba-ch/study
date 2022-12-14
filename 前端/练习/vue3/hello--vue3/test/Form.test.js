import { mount } from "@vue/test-utils";
import Form from "../src/components/Form.vue";

test('submits a form', async () => {
  const wrapper = mount(Form);

  const email = 'name@mail.com'
  const description = 'Lorem ipsum dolor sit amet'
  const city = 'moscow'
  
  await wrapper.find('input[type=email]').setValue('name@mail.com')
  await wrapper.find('textarea').setValue('Lorem ipsum dolor sit amet')
  await wrapper.find('select').setValue('moscow')
  await wrapper.find('input[type=checkbox]').setValue()
  await wrapper.find('input[type=radio][value=monthly]').setValue()

  await wrapper.find('form').trigger('submit.prevent')

  expect(wrapper.emitted('submit')[0][0]).toStrictEqual({
    email,
    description,
    city,
    subscribe: true,
    interval: 'monthly'
  })
})