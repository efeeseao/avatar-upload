import { useCallback, useState } from "react"

interface DragDropEvents {
  onDrop?: ((event: React.DragEvent<HTMLElement>) => void) | undefined
  onDragEnter?: ((event: React.DragEvent<HTMLElement>) => void) | undefined
  onDragLeave?: ((event: React.DragEvent<HTMLElement>) => void) | undefined
  onDragOver?: ((event: React.DragEvent<HTMLElement>) => void) | undefined
}

export const useDragDrop = ({
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
}: DragDropEvents) => {
  const [isDragging, setIsDragging] = useState(false)

  const onDragLeaveCb = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: call onDragLeave only when leave current ref and all of it's children
    setIsDragging(false)
    if (onDragLeave) onDragLeave(e)
  }, [onDragLeave])

  const onDragEnterCb = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    if (onDragEnter) onDragEnter(e)
  }, [onDragEnter])

  const onDragOverCb = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setIsDragging(true)
    if (onDragOver) onDragOver(e)
  }, [onDragOver])

  const onDropCb = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (onDrop) onDrop(e)
  }, [onDrop])

  return {
    onDragLeave: onDragLeaveCb,
    onDragEnter: onDragEnterCb,
    onDragOver: onDragOverCb,
    onDrop: onDropCb,
    isDragging
  }
}