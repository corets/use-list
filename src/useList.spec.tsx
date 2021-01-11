import React from "react"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import { createList, ObservableList } from "@corets/list"
import { useList } from "./index"

describe("useList", () => {
  it("uses list", async () => {
    const list = createList(["foo"])

    const Test = () => {
      const state = useList(list)

      return <h1>{state.get()[0]}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
  })

  it("uses list with initializer", () => {
    const initializer = () => createList(["foo"])

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
  })

  it("uses new list", () => {
    const initializer = ["foo"]

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
  })

  it("uses new list with initializer", () => {
    const initializer = () => ["foo"]

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
  })

  it("updates and resets state", () => {
    const sharedList = createList(["foo"])
    let renders = 0
    let receivedList: ObservableList

    const Test = () => {
      renders++
      const state = useList(sharedList)
      receivedList = state

      return <h1>{state.get()[0]}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
    expect(sharedList.get()).toEqual(["foo"])
    expect(renders).toBe(1)

    act(() => receivedList.set(["bar"]))

    expect(target().text()).toBe("bar")
    expect(sharedList.get()).toEqual(["bar"])
    expect(renders).toBe(2)

    act(() => receivedList.add("baz", "yolo"))

    expect(target().text()).toBe("bar")
    expect(sharedList.get()).toEqual(["bar", "baz", "yolo"])
    expect(renders).toBe(3)

    act(() => receivedList.reset())

    expect(target().text()).toBe("foo")
    expect(sharedList.get()).toEqual(["foo"])
    expect(renders).toBe(4)

    act(() => receivedList.reset(["bar", "baz"]))

    expect(target().text()).toBe("bar")
    expect(sharedList.get()).toEqual(["bar", "baz"])
    expect(renders).toBe(5)

    act(() => sharedList.set(["foo"]))

    expect(target().text()).toBe("foo")
    expect(sharedList.get()).toEqual(["foo"])
    expect(renders).toBe(6)

    act(() => sharedList.set(["foo", "bar"]))

    expect(target().text()).toBe("foo")
    expect(sharedList.get()).toEqual(["foo", "bar"])
    expect(renders).toBe(7)

    act(() => sharedList.add("yolo"))

    expect(target().text()).toBe("foo")
    expect(sharedList.get()).toEqual(["foo", "bar", "yolo"])
    expect(renders).toBe(8)

    act(() => sharedList.reset())

    expect(target().text()).toBe("bar")
    expect(sharedList.get()).toEqual(["bar", "baz"])
    expect(renders).toBe(9)

    act(() => sharedList.reset(["bar", "baz"]))

    expect(target().text()).toBe("bar")
    expect(sharedList.get()).toEqual(["bar", "baz"])
    expect(renders).toBe(9)
  })
})
