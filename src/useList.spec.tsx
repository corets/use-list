import React from "react"
import { createList, ObservableList } from "@corets/list"
import { useList } from "./index"
import { act, render, screen } from "@testing-library/react"

describe("useList", () => {
  it("uses list", async () => {
    const list = createList(["foo"])

    const Test = () => {
      const state = useList(list)

      return <h1>{state.get()[0]}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
  })

  it("uses list with initializer", () => {
    const initializer = () => createList(["foo"])

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
  })

  it("uses new list", () => {
    const initializer = ["foo"]

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
  })

  it("uses new list with initializer", () => {
    const initializer = () => ["foo"]

    const Test = () => {
      const list = useList(initializer)

      return <h1>{list.get()[0]}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
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

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
    expect(sharedList.get()).toEqual(["foo"])
    expect(renders).toBe(1)

    act(() => receivedList.set(["bar"]))

    expect(target).toHaveTextContent("bar")
    expect(sharedList.get()).toEqual(["bar"])
    expect(renders).toBe(2)

    act(() => receivedList.add("baz", "yolo"))

    expect(target).toHaveTextContent("bar")
    expect(sharedList.get()).toEqual(["bar", "baz", "yolo"])
    expect(renders).toBe(3)

    act(() => sharedList.set(["foo"]))

    expect(target).toHaveTextContent("foo")
    expect(sharedList.get()).toEqual(["foo"])
    expect(renders).toBe(4)

    act(() => sharedList.set(["foo", "bar"]))

    expect(target).toHaveTextContent("foo")
    expect(sharedList.get()).toEqual(["foo", "bar"])
    expect(renders).toBe(5)

    act(() => sharedList.add("yolo"))

    expect(target).toHaveTextContent("foo")
    expect(sharedList.get()).toEqual(["foo", "bar", "yolo"])
    expect(renders).toBe(6)
  })
})
