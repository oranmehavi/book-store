import React from 'react'
import BooksContextProvider from '../context/BooksContext'

export default function BooksLoader({children}) {
  return (
    <BooksContextProvider>
        {children}
    </BooksContextProvider>
  )
}
