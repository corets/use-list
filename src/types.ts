import { ObservableList } from "@corets/list"

export type ListInitializer<TState> = TState | (() => TState)
export type UseList = <TState>(
  initialState: ListInitializer<TState[] | ObservableList<TState>>
) => ObservableList<TState>
