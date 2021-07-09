import { isFunction } from "lodash"
import { ListInitializer } from "./types"
import { createList, List, ObservableList } from "@corets/list"

export const unwrapList = <TState>(
  initialState: ListInitializer<TState[] | ObservableList<TState>>
): ObservableList<TState> => {
  let list = isFunction(initialState) ? initialState() : initialState

  if (!(list instanceof List)) {
    list = createList(list as TState[])
  }

  return list
}
