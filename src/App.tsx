import { ApiResponseProvider } from "@/context/ApiResponseContext";

function App() {
  return (
    <ApiResponseProvider>
      <p>Hello World</p>
    </ApiResponseProvider>
  )
}

export default App
