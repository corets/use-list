import { useEffect, useMemo, useState } from "react"
import { unwrapList } from "./unwrapList"
import { UseList } from "./types"

export const useList: UseList = <TState>(initialState) => {
  const list = useMemo(() => unwrapList<TState>(initialState), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return list.listen(() => setReference((previous) => previous + 1), false)
  }, [])

  return list
}
