import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/Table/Table';
import { TableData } from '../types/TableData';

export const useData = () => {
  const [data, setData] = useState<TableData[] | null>(null)

  const fetchData = () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => response.json())
      .then((fetcheddata) => {
        localStorage.setItem('tabledata', JSON.stringify(fetcheddata))
        setData(fetcheddata)
      })
  }

  useEffect(() => {
    const localdata = localStorage.getItem('tabledata')
    if (localdata != null) {
      setData(JSON.parse(localdata))
      return
    }
    fetchData()
  }, [])

  const setLocalData = useCallback((newdata: TableData[]) => {
    localStorage.setItem('tabledata', JSON.stringify(newdata))
  }, [])
  return { data, setLocalData }
}

const TablePage = () => {
  const { data, setLocalData } = useData()
  if (data == null) return null

  return (
    <Table data={data} setLocalData={setLocalData} />
  );
}

export default TablePage
