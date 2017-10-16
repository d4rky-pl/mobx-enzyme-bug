import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { mount, shallow, configure } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

@observer
class TestComponent extends React.Component {
  @observable foo = 0

  @action onClick() {
    this.foo += 1
  }

  render() {
    return (
      <div onClick={this.onClick.bind(this)}>
        {this.foo}
      </div>
    )
  }
}

describe('TestComponent', () => {
  it('updates with mount()', () => {
    const component = mount(<TestComponent/>)
    component.find('div').simulate('click')
    component.update()
    expect(component.text()).toEqual("1")
  })

  it('updates with shallow()', () => {
    const component = shallow(<TestComponent/>)
    component.find('div').simulate('click')
    component.update()
    expect(component.text()).toEqual("1")
  })
})
