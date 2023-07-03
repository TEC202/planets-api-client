import React from 'react';
import { ExpectedTableData, ExpectedAPIResponse, Column } from './types'
import './App.css';
import { mapPlanetDataToTableData, sortObjArrayByKey } from './util';

function App() {
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [tableData, setTableData] = React.useState([] as ExpectedTableData[])
  const [columns, setColumns] = React.useState([
    { label: 'Name', key: 'name' },
    { label: 'Climate', key: 'climate' },
    { label: 'Number of Residents', key: 'numberOfResidents' },
    { label: 'Terrain', key: 'terrain' },
    { label: 'Population', key: 'population' },
    { label: 'Surface Area covered by water (km\u00B2)', key: 'surfaceWater' },
  ] as Column[])

  async function getTableData(pageNumber: number) {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?page=${pageNumber}`)
      if (!response.ok) throw new Error('Error getting data')
      const data = await response.json() as ExpectedAPIResponse
      if (!data.results || !data.results.length) {
        setErrorMessage('No data found')
        return setIsLoading(false)
      }
      
      let mappedData = data.results.map((planet) => {
        return mapPlanetDataToTableData(planet)
      })
      mappedData = sortObjArrayByKey(mappedData, 'name', 'desc')
      setTableData(mappedData)
      console.log(mappedData)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Error getting data')
      }
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getTableData(page)
  }, [page])



  return (
    <div className="App">
      <header className="App-header">
        <h1>Planets</h1>
      </header>
      <main>


      </main>
    </div>
  );
}


export default App;
